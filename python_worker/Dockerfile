# Use Python base image
FROM python:3.10

# Install required dependencies
# RUN apt-get update && apt-get install -y docker.io && rm -rf /var/lib/apt/lists/*
# No Need docker.io i will use mounting docker socket.

# Set the working directory
WORKDIR /app

# install requirements
RUN pip install --no-cache-dir pika

# Copy the worker script
COPY worker.py .
COPY saveit.py .
COPY runit.py .

# Set execution permissions
RUN chmod +x worker.py
RUN chmod +x runit.py
RUN chmod +x saveit.py

# Start the worker script
CMD ["python3", "-u", "worker.py"]
