FROM docker:24-dind

# Install dependencies, Python 3, and tzdata (if you need timezone setup)
RUN apk add --no-cache python3 py3-pip tzdata

# Set the timezone to Asia/Dhaka
RUN ln -sf /usr/share/zoneinfo/Asia/Dhaka /etc/localtime && \
    echo "Asia/Dhaka" > /etc/timezone

# Create a virtual environment and install dependencies inside the virtual environment
RUN python3 -m venv /venv && \
    /venv/bin/pip install pika psycopg2-binary

# Set environment variables for virtual environment
ENV PATH="/venv/bin:$PATH"

# Set the working directory
WORKDIR /worker

# Copy your worker scripts
COPY worker.py saveit.py runit.py updateDB.py deleteit.py ./

# Set execution permissions for all Python scripts
RUN chmod +x *.py

# Run the worker script as the entry point
CMD ["python3", "-u", "worker.py"]
