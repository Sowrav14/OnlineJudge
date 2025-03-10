import os
import subprocess

PROBLEM_DIR='/mnt/f9c1f3d8-0670-4462-b1e2-11df695e40ee/Online-Judge-Backend/Online_Judge/problems'

def run_code_in_docker(solution_dir, problem_id, filename):
    """
    Run the code in a Docker container.
    """
    # Docker image name (you can customize based on language)
    try:
        docker_image = 'online-judge'  # Replace with actual Docker image name
        problem_dir = os.path.join(PROBLEM_DIR, f'problem_{problem_id}')
        if not os.path.exists(problem_dir):
            return "Error getting the problem"
        if not os.path.exists(solution_dir):
            return "Error getting the solution"

        # Prepare the docker run command based on the language
        docker_command = [
            "docker", "run", "--rm", "--network", "judge",
            "-e", f"solutionId={filename}",
            "-v", f"{problem_dir}:/judge/problem",
            "-v", f"{solution_dir}:/judge/solution",
            docker_image
        ]
        result = subprocess.run(docker_command, capture_output=True, text=True)
        return result.stdout
    except Exception as e:
        print(f"Error while running code: {e}")
        return None