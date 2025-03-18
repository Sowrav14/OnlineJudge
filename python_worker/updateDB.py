import psycopg2

# Database connection details
hostname = 'localhost'
database = 'pgdb'
username = 'sowrav'
password = 'sowravnath'
port = '5432'

# Connect to PostgreSQL (Connection open for the lifetime of the app)
conn = psycopg2.connect(
    dbname=database,
    user=username,
    password=password,
    host=hostname,
    port=port
)

def UpdateDatabase(submissionId, data):
    try :
        # Create a cursor object
        cursor = conn.cursor()

        # Update the Submission table
        cursor.execute("""
            UPDATE "Submission"
            SET "verdict" = %s, "totalTest" = %s, "passedTest" = %s, "memory" = %s, "time" = %s
            WHERE "submissionId" = %s
        """, (data['verdict'], data['totalTest'], data['passedTest'], data['memory'], data['time'], submissionId))

        # Commit the transaction
        conn.commit()

        # Close the cursor (don't close the connection)
        cursor.close()

        print("Submission updated successfully!")
        return True
    except Exception as e:
        print("Error in Updating Submission in Database", e)
        return False
    finally : 
        if conn:
            conn.rollback()  # Rollback any partial changes in case of failure
            # Don't close the connection in the function if you need to keep it open
            # Close the connection only when you're done with all database operations.
            pass

