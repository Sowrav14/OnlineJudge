import os
import subprocess

CONTAINER_PROBLEM_DIR='/judge/problem'
CONTAINER_SOLUTION_DIR='/judge/solution'
HOST_PROBLEM_DIR='/mnt/f9c1f3d8-0670-4462-b1e2-11df695e40ee/OnlineJudge/the_judge/problems'
HOST_SOLUTION_DIR='/mnt/f9c1f3d8-0670-4462-b1e2-11df695e40ee/OnlineJudge/the_judge/solutions'
DOCKER_IMAGE='the-judge'

# return None if error else
# return 
#   - Final Verdict : 'AC'
#   - Time : 1.2
#   - Memory : 128
#   - Total Test : 10
#   - Passed Test : 5
def run_code_in_docker(problem_id, solution_dir, submissionId):
    """
    Run the code in a Docker container.
    """
    # Docker image name (you can customize based on language)
    try:
        problem_dir = os.path.join(HOST_PROBLEM_DIR, f'problem_{problem_id}')
        if not os.path.exists(problem_dir):
            print("Error : No problem found", problem_dir)
            return None

        # Prepare the docker run command based on the language
        docker_command = [
            "docker", "run", "--rm", "--network", "judge",
            "-e", f"submissionId={submissionId}",
            "-e", f"TZ=$(cat /etc/timezone)",
            "-v", f"{problem_dir}:{CONTAINER_PROBLEM_DIR}",
            "-v", f"{solution_dir}:{CONTAINER_SOLUTION_DIR}",
            DOCKER_IMAGE
        ]
        try :
            result = subprocess.run(docker_command, capture_output=True, text=True, check=True)
            return result.stdout
        except Exception as e:
            print(f"Error while running code 2: {e}")
            return None
    except Exception as e:
        print(f"Error while running code 1: {e}")
        return None