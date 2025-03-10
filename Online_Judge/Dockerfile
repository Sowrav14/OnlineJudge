# Use Ubuntu as base image
FROM ubuntu:latest

# Set environment variables for non-interactive mode
ENV DEBIAN_FRONTEND=noninteractive

# Install necessary tools, including Python, g++, and time
RUN apt-get update && \
    apt-get install -y \
    g++ \
    python3 \
    python3-pip \
    python3-venv \
    time \
    && rm -rf /var/lib/apt/lists/*

# Set working directory inside container
RUN mkdir -p /judge

# Create a virtual environment and activate it
RUN python3 -m venv /judge/venv

# Upgrade pip inside the virtual environment
RUN /judge/venv/bin/pip install --upgrade pip

# Install pika (RabbitMQ Python client) inside the virtual environment
RUN /judge/venv/bin/pip install pika

# Copy execution script and Python script
COPY script.sh /judge/script.sh
COPY script.py /judge/script.py

# Set permissions for execution script
RUN chmod +x /judge/script.sh

# Set the default entrypoint
ENTRYPOINT ["/judge/venv/bin/python", "/judge/script.py"]