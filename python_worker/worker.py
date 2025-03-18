import pika
import json
import time
import re
from saveit import save_code_locally
from runit import run_code_in_docker
from updateDB import UpdateDatabase
from datetime import datetime

RABBITMQ_PARAM='localhost'


# Establish a connection to RabbitMQ
connection = pika.BlockingConnection(pika.ConnectionParameters(RABBITMQ_PARAM))
channel = connection.channel()

# Declare the queue and exchange
channel.queue_declare(queue='code_queue')
channel.exchange_declare(exchange='submission-status', exchange_type='fanout')

# Publish current status in the exchange
def publish_status(submissionId, status, isFinal):
    currentTime = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    message = json.dumps({
        "submissionId":submissionId, 
        "status":status, 
        "isFinal":isFinal, 
        "time":currentTime
    })
    channel.basic_publish(exchange='submission-status', routing_key='', body=message)

# Parse the final verdict of this form 
#   - Final Verdict : 'AC'
#   - Time : 1.2
#   - Memory : 128
#   - Total Test : 10
#   - Passed Test : 5
pattern = r"Final Verdict : (?P<verdict>\w+)\n\s*Time : (?P<time>[\d.]+)\n\s*Memory : (?P<memory>\d+)\n\s*Total Test : (?P<totalTest>\d+)\n\s*Passed Test : (?P<passedTest>\d+)\n"
def parse_verdict(verdict):
    match = re.search(pattern, verdict)
    if match:
        data = match.groupdict()
        return data
    else :
        return None

def callback(ch, method, properties, body):
    # Decode the incoming message
    codeData = json.loads(body)
    retryCount = properties.headers.get('retryCount', 0)
    
    submissionId = codeData['submissionId']
    problemId = codeData['problemId']
    language = codeData['language']
    code = codeData['code']
    print(f"Received Submission : ",codeData)

    # print(f"Retry : {retryCount} of 3")
    if retryCount >= 2 :
        # print("Max retry exceeded")
        publish_status(submissionId, "Failed : Max retry exceeded", True)
        ch.basic_nack(delivery_tag=method.delivery_tag, requeue=False)
        return


    publish_status(submissionId, "Received", False)
    time.sleep(2)
    publish_status(submissionId, "Processing", False)
    time.sleep(2)

    solution_dir = save_code_locally(code=code, submissionId=submissionId, language=language)
    print("Submission is saved locally : ", solution_dir)
    if(solution_dir == None) :
        publish_status(submissionId, "Retrying : Error Saving", False)
        retryCount = retryCount + 1
        body = json.dumps(codeData)
        ch.basic_publish(exchange='',
            routing_key='code_queue',
            body=body,
            properties=pika.BasicProperties(
                headers={'retryCount': retryCount}
            )
        )
        ch.basic_nack(delivery_tag=method.delivery_tag, requeue=False)
        return None
    
    publish_status(submissionId, "Submitted", False)
    time.sleep(2)
    print("Submission is processing in docker container ")
    verdict = run_code_in_docker(problemId, solution_dir, submissionId)
    if(verdict == None) :
        publish_status(submissionId, "Retrying : Error Running", False)
        retryCount = retryCount + 1
        body = json.dumps(codeData)
        ch.basic_publish(exchange='',
                     routing_key='code_queue',
                     body=body,
                     properties=pika.BasicProperties(
                         headers={'retryCount': retryCount}
                     ))
        ch.basic_nack(delivery_tag=method.delivery_tag, requeue=False)
        return None
    
    print("Verdict received : ", verdict)
    parsedVerdict = parse_verdict(verdict)
    if parsedVerdict == None :
        publish_status(submissionId, "Retrying : Error Fetching Status", False)
        retryCount = retryCount + 1
        body = json.dumps(codeData)
        ch.basic_publish(exchange='',
                     routing_key='code_queue',
                     body=body,
                     properties=pika.BasicProperties(
                         headers={'retryCount': retryCount}
                     ))
        ch.basic_nack(delivery_tag=method.delivery_tag, requeue=False)
        return None
    
    isUpdated = UpdateDatabase(submissionId=submissionId, data=parsedVerdict)
    if isUpdated == False : 
        publish_status(submissionId, "Retrying : Error Updating Status", False)
        retryCount = retryCount + 1
        body = json.dumps(codeData)
        ch.basic_publish(exchange='',
                     routing_key='code_queue',
                     body=body,
                     properties=pika.BasicProperties(
                         headers={'retryCount': retryCount}
                     ))
        ch.basic_nack(delivery_tag=method.delivery_tag, requeue=False)
        return None


    # time.sleep(5)
    publish_status(submissionId, parsedVerdict, True)
    ch.basic_ack(delivery_tag=method.delivery_tag)
    print(f'{parsedVerdict}')


# Set up the consumer to listen to the queue
channel.basic_consume(queue='code_queue', on_message_callback=callback, auto_ack=False)

print('Waiting for messages. To exit press CTRL+C')
channel.start_consuming()
