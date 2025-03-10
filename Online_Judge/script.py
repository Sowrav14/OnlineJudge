import subprocess
import sys
import os
import glob
import pika
import json

# Setting RabbitMQ
rabbitmq_host = 'rabbitmq'
connection = pika.BlockingConnection(pika.ConnectionParameters(host=rabbitmq_host))
channel = connection.channel()
channel.exchange_declare(exchange='solution-status', exchange_type='fanout')
filename = os.getenv("solutionId")

def run_compilation_and_execution(lang, code_file, input_file, time_limit, memory_limit):
    command = f"/judge/script.sh {lang} {code_file} {input_file} {time_limit} {memory_limit}"
    result = subprocess.run(command, shell=True, capture_output=True, text=True)
    
    return result.returncode, result.stdout, result.stderr


def compare_outputs(output_file, expected_output_file):
    try:
        with open(output_file, "r") as f:
            output = f.read().strip()
    except FileNotFoundError:
        return "RE"
    
    with open(expected_output_file, "r") as f:
        expected_output = f.read().strip()
    
    if output == expected_output:
        return "AC"
    else:
        return "WA"

# Publish current status in the exchange
def publish_status(status):
    message = json.dumps({"solutionId":filename, "status":status})
    channel.basic_publish(exchange='solution-status', routing_key='', body=message)


def main():
    # File Paths
    solution_dir = "/judge/solution"
    problem_dir = "/judge/problem"

    # Get the code file.
    code_files = glob.glob(os.path.join(solution_dir, "solution.*"))
    code_file = code_files[0]
    # Language (cpp, java, python)
    lang = code_file.split(".")[-1]
    
    # Time and Memory Limits (in seconds and kilobytes)
    time_limit = 2
    memory_limit = 128 * 1024
    with open('/judge/problem/time_limit.txt', 'r') as file:
        time_limit = int(file.read().strip())
        time_limit = time_limit + 0.5
    with open('/judge/problem/memory_limit.txt', 'r') as file:
        memory_limit = int(file.read().strip())
        memory_limit = memory_limit * 1024 + 512
    
    # Get the input and expected input files.
    input_files = sorted(glob.glob(os.path.join(problem_dir, "input*.txt")))
    expected_output_files = sorted(glob.glob(os.path.join(problem_dir, "expected_output*.txt")))
    
    # Run the solution on input files and get the results
    final_verdict = "AC"
    passed_test = 0
    for i, input_file in enumerate(input_files):
        expected_output_file = expected_output_files[i]
        publish_status(f"Running on Test: {i+1}")
        return_code, stdout, stderr = run_compilation_and_execution(lang, code_file, input_file, time_limit, memory_limit)

        if return_code == 0:
            verdict = compare_outputs("/judge/solution/output.txt", expected_output_file)
            final_verdict = verdict
        elif return_code == 2:
            final_verdict = 'TLE'
        elif return_code == 3:
            final_verdict = 'MLE'
        elif return_code == 4:
            final_verdict = 'RE'
        else:
            final_verdict = 'CE'
        
        # Check if passed current test
        if final_verdict != 'AC':
            break
        
        passed_test = i + 1
    
    print(f"Final Verdict : {final_verdict}")
    print(f"Test passed : {passed_test}")

if __name__ == "__main__":
    main()