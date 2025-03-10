import pika
import json
import time
import re
from saveit import save_code_locally
from runit import run_code_in_docker


# Establish a connection to RabbitMQ
connection = pika.BlockingConnection(pika.ConnectionParameters('localhost'))
channel = connection.channel()

# Declare the queue and exchange
channel.queue_declare(queue='code_queue')
channel.exchange_declare(exchange='solution-status', exchange_type='fanout')

# Publish current status in the exchange
def publish_status(filename, status):
    message = json.dumps({"solutionId":filename, "status":status})
    channel.basic_publish(exchange='solution-status', routing_key='', body=message)

def parse_verdict(verdict):
    match = re.search(r"Final Verdict : (\w+)\nTest passed : (\d+)\n", verdict)
    if match:
        status = match.group(1)
        tests = int(match.group(2))
        return status, tests
    else :
        return None, None

def callback(ch, method, properties, body):
    # Decode the incoming message
    code_data = json.loads(body)
    retry_count = properties.headers.get('retry_count', 0)
    
    filename = code_data['filename']
    problem_id = code_data['problem_id']
    user_id = code_data['user_id']
    language = code_data['language']
    code = code_data['code']

    # print(f"Retry : {retry_count} of 3")
    if retry_count > 3 :
        # print("Max retry exceeded")
        publish_status(filename, "Failed : Max retry exceeded")
        ch.basic_nack(delivery_tag=method.delivery_tag, requeue=False)
        return


    print(f"Received Solution : {code_data['filename']}")
    publish_status(filename, "Queued")
    time.sleep(5)
    publish_status(filename, "Recieved in worker")
    time.sleep(2)
    publish_status(filename, "Getting ready for submission")
    time.sleep(2)
    solution_dir = save_code_locally(code=code, filename=filename, language=language)

    if(solution_dir == None) :
        # print(f"Retry...")
        publish_status(filename, "Retrying : Error in worker")
        retry_count = retry_count + 1
        body = json.dumps(code_data)
        ch.basic_publish(exchange='',
                     routing_key='code_queue',
                     body=body,
                     properties=pika.BasicProperties(
                         headers={'retry_count': retry_count}
                     ))
        ch.basic_nack(delivery_tag=method.delivery_tag, requeue=False)
        return None
    
    publish_status(filename, "Ready for judging.")
    time.sleep(2)
    publish_status(filename, "Running in docker")
    time.sleep(2)

    verdict = run_code_in_docker(solution_dir, problem_id, filename)

    if(verdict == None) :
        publish_status(filename, "Retrying : Error in Docker")
        retry_count = retry_count + 1
        body = json.dumps(code_data)
        ch.basic_publish(exchange='',
                     routing_key='code_queue',
                     body=body,
                     properties=pika.BasicProperties(
                         headers={'retry_count': retry_count}
                     ))
        ch.basic_nack(delivery_tag=method.delivery_tag, requeue=False)
        return None
    status, tests = parse_verdict(verdict)
    if status == None :
        publish_status(filename, "Retrying : Error in Fetching Status")
        retry_count = retry_count + 1
        body = json.dumps(code_data)
        ch.basic_publish(exchange='',
                     routing_key='code_queue',
                     body=body,
                     properties=pika.BasicProperties(
                         headers={'retry_count': retry_count}
                     ))
        ch.basic_nack(delivery_tag=method.delivery_tag, requeue=False)
        return None
    
    if status == 'AC':
        message = 'AC'
    elif status == 'CE':
        message = 'CE'
    else :
        message = f"{status} on Test: {tests+1}"
    
    time.sleep(5)
    publish_status(filename, message)
    ch.basic_ack(delivery_tag=method.delivery_tag)
    print(f'{verdict}')


# Set up the consumer to listen to the queue
channel.basic_consume(queue='code_queue', on_message_callback=callback, auto_ack=False)

print('Waiting for messages. To exit press CTRL+C')
channel.start_consuming()
