import os
CONTAINER_PROBLEM_DIR='/judge/problem'
CONTAINER_SOLUTION_DIR='/judge/solution'
WORKER_PROBLEM_DIR='/worker/problems'
WORKER_SOLUTION_DIR='/worker/solutions'


def delete_code_directory(submissionId):
    """
    Delete the directory where the user's code is stored.
    """
    try:
        solution_dir = os.path.join(WORKER_SOLUTION_DIR, f"solution_{submissionId}")
        
        # Check if the directory exists
        if os.path.exists(solution_dir) and os.path.isdir(solution_dir):
            # Delete the directory and its contents
            for root, dirs, files in os.walk(solution_dir, topdown=False):
                for file in files:
                    os.remove(os.path.join(root, file))  # Remove each file
                for dir in dirs:
                    os.rmdir(os.path.join(root, dir))  # Remove each subdirectory
            os.rmdir(solution_dir)  # Finally remove the main directory
            print(f"Directory for submission {submissionId} deleted successfully.")
        else:
            print(f"Directory for submission {submissionId} not found.")
    except Exception as e:
        print(f"Error while deleting directory: {e}")
