import os
CONTAINER_PROBLEM_DIR='/judge/problem'
CONTAINER_SOLUTION_DIR='/judge/solution'
HOST_PROBLEM_DIR='/mnt/f9c1f3d8-0670-4462-b1e2-11df695e40ee/OnlineJudge/The_Judge/problems'
HOST_SOLUTION_DIR='/mnt/f9c1f3d8-0670-4462-b1e2-11df695e40ee/OnlineJudge/The_Judge/solutions'


def save_code_locally(code, submissionId, language):
    """
    Save the user's code to a local directory.
    """
    try :
        solution_dir = os.path.join(HOST_SOLUTION_DIR, f"solution_{submissionId}")
        
        # Create directory for the user if it doesn't exist
        if not os.path.exists(solution_dir):
            os.makedirs(solution_dir)
        
        file_extension = (
            ".cpp" if language == "cpp" else 
            ".py" if language == "python" else 
            ".java" if language == "java" else 
            ".js" if language == "javascript" else
            ""
        )
        if(file_extension == "") :
            print("Invalid file Language.")
            return None
        
        code_path = os.path.join(solution_dir, f'solution{file_extension}')
        
        code_bytes = code.encode('utf-8')
        # Save the code to the specific directory
        with open(code_path, 'wb') as f:
            f.write(code_bytes)
        
        return solution_dir
    except Exception as e :
        print(f"Error while saving code: {e}")
        return None