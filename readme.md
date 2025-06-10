# OnlineJudge: A Modern Competitive Programming Platform

![OnlineJudge Banner](https://via.placeholder.com/1200x200.png?text=OnlineJudge+Banner) <!-- Replace with your project banner image -->

## Overview

OnlineJudge is a dynamic, full-stack web application designed to emulate the functionality of competitive programming platforms like Codeforces and LeetCode. It allows users to browse problem statements, submit code in multiple languages (C++, Python, Java, JavaScript), view real-time submission statuses, and check their submission history. Problem setters can add new problems with hidden test cases, instantly integrated into the platform. This project is a testament to my passion for building scalable, real-time systems and mastering modern development tools to create a seamless user experience.

My goal was to create a practical yet elegant system to practice and showcase my skills in a variety of technologies, from frontend frameworks to message queues and containerization. OnlineJudge is not about reinventing the wheel but about exploring how these technologies come together to solve real-world problems, fueling my curiosity to dive deeper into system design, distributed systems, and competitive programming platforms.

## Features

- **User Authentication**: Supports Google OAuth, GitHub OAuth, and manual authentication for secure access.
- **Problem Browsing**: Displays a list of problems fetched from a PostgreSQL database, with details like submission count and acceptance rate.
- **Code Submission**: Users can write code in an integrated editor or upload files, with automatic language detection.
- **Real-Time Submission Status**: WebSocket-based updates show statuses like "Queued," "Running on Test 1," "Accepted," or "Wrong Answer" in real time.
- **Submission History**: Users can view their past submissions and verdicts.
- **Problem Setting**: Authorized users can add problems with descriptions and hidden test cases, instantly available on the platform.
- **Scalable Architecture**: Handles multiple submissions concurrently using RabbitMQ queues and fanout exchanges.
- **Isolated Code Execution**: Uses Docker containers to securely execute and evaluate code against test cases.

## Tech Stack

This project was an opportunity to master and integrate a diverse set of technologies, each chosen for its specific strengths:

- **Next.js**: A React-based framework for building a fast, server-rendered frontend with an intuitive developer experience.
- **NextAuth.js**: Provides secure authentication with Google OAuth, GitHub OAuth, and manual login, ensuring robust user management.
- **ShadCN UI**: A modern, customizable UI component library for creating a sleek, user-friendly interface.
- **PostgreSQL**: A powerful relational database for storing user data, problems, submissions, and test cases.
- **Prisma ORM**: Simplifies database interactions with type-safe queries and schema migrations.
- **RabbitMQ**: Implements a queue for code submissions and a fanout exchange for real-time status updates, enabling scalability and decoupled communication.
- **WebSocket (Node.js + TypeScript)**: Powers real-time updates for submission statuses, delivering a dynamic user experience.
- **Docker**: Containerizes the Judge component for secure, isolated code execution and simplifies deployment with Docker Compose.
- **Docker-in-Docker (DinD)**: Allows the Judge to run nested containers for executing user code in a controlled environment.
- **Python Worker**: Manages code processing, test case execution, and problem storage, leveraging Python’s scripting capabilities.
- **Bash & Python Scripting**: Used within the Judge to execute code and compare outputs against test cases.
- **Supported Languages**: C++, Python, Java, and JavaScript for code submissions, broadening accessibility for users.

---

## 🔧 Tech Stack Breakdown

| Component          | Tech Used                              | Purpose                                  |
|--------------------|--------------------------------------|------------------------------------------|
| Frontend           | Next.js, ShadCN UI, NextAuth, Prisma, PostgreSQL | UI rendering, authentication, DB access |
| Authentication     | NextAuth, Google OAuth, GitHub OAuth, Manual | Secure and flexible login                 |
| Database           | PostgreSQL                           | Stores users, problems, submissions, verdicts |
| ORM                | Prisma                              | Type-safe DB access                       |
| Messaging Queue    | RabbitMQ                           | Decoupled communication between components |
| WebSocket Server   | Node.js, TypeScript, ws            | Real-time status updates                  |
| Worker             | Python                             | Handles code execution and problem ingestion |
| Code Executor (The Judge) | Docker, bash, python          | Sandboxed multi-language code runner     |
| Container Orchestration | Docker Compose, docker-in-docker | Environment management                    |

---


Each technology was carefully selected to deepen my understanding of full-stack development, real-time systems, and containerization. This project allowed me to explore how these tools interact in a production-like environment, reinforcing my skills and passion for system design.

## Architecture

The system is divided into four major components, orchestrated to work seamlessly:

![Architecture Diagram](docs/OnlineJudgeArchitecture.png) <!-- Replace with actual diagram URL -->


## 🧠 Project Components

1️⃣ **Frontend**  
- Built with Next.js and styled using ShadCN UI  
- Code editor with auto language detection and syntax highlighting  
- Integrated with NextAuth for OAuth and manual login  
- Submission form sends code to backend, receives real-time verdicts  

2️⃣ **WebSocket Server**  
- Built using ws and Node.js in TypeScript  
- Connected clients (submitters) receive updates on submission progress  
- Publishes verdicts via RabbitMQ fanout exchange  

3️⃣ **Python Worker**  
- Pulls submissions and problem definitions from RabbitMQ queues  
- Prepares input/output, executes code using the the-judge image  
- Publishes status at each stage back to exchange for real-time updates  
- Cleans up after processing  

4️⃣ **The Judge (Docker Image)**  
- Contains execution environments for C++, Python, Java, and JavaScript  
- Accepts code, input, and language  
- Compiles/runs inside Docker-in-Docker  
- Returns granular verdicts (Accepted, WA, TLE, MLE, RE, etc.)  

---
## Workflow

1. **User Authentication**: Users log in via Google, GitHub, or manual auth, with data stored in PostgreSQL.
2. **Problem Selection**: Users browse problems fetched from PostgreSQL and select one to solve.
3. **Code Submission**: Users write or upload code, which is saved to PostgreSQL and queued in RabbitMQ.
4. **Real-Time Updates**: The WebSocket server delivers statuses (e.g., “Queued,” “Running on Test 1”) from RabbitMQ’s fanout exchange.
5. **Code Execution**: The Python Worker processes the queued code, sends it to the Judge (via DinD), and evaluates outputs.
6. **Verdict Delivery**: The Judge returns verdicts (e.g., “Accepted,” “Wrong Answer”) to the Worker, which updates PostgreSQL and notifies the user via WebSocket.
7. **Problem Setting**: Setters submit problems and test cases, which are queued and processed similarly.

## Demo

Below is demonstrations of key workflows:

### Code Submission and Real-Time Status
![Submission Demo](docs/demo-submission.gif) <!-- Replace with actual GIF URL -->

## Installation and Setup

See the [Setup Guide](docs/setup-guide.md) for detailed instructions.

### Quick Start
1. **Clone the Repository**:
   ```bash
   git clone https://github.com/yourusername/onlinejudge.git
   cd onlinejudge
   ```
2. **Install Dependencies**:
   ```bash
   npm install
   pip install -r requirements.txt
   ```
3. **Set Up Environment Variables**:
   Create a `.env` file:
   ```env
   DATABASE_URL=postgresql://user:password@localhost:5432/onlinejudge
   NEXTAUTH_SECRET=your_secret
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret
   GITHUB_CLIENT_ID=your_github_client_id
   GITHUB_CLIENT_SECRET=your_github_client_secret
   RABBITMQ_URL=amqp://guest:guest@localhost:5672/
   ```
4. **Run Migrations**:
   ```bash
   npx prisma migrate dev
   ```
5. **Build Judge Image**:
   ```bash
   docker build -t onlinejudge-judge ./judge
   ```
6. **Start Services**:
   ```bash
   docker-compose up -d
   ```
7. **Access the App**:
   Open `http://localhost:3000`.

## Documentation
- [Architecture Overview](docs/architecture.md)
- [Setup Guide](docs/setup-guide.md)
- [Usage Guide](docs/usage-guide.md)
- [Contributing](docs/contributing.md)

## Future Plans

OnlineJudge is a stepping stone in my journey to master system design and distributed systems. In the future, I plan to:
- Optimize performance with caching (e.g., Redis) and load balancing.
- Add features like leaderboards, contests, and code analysis tools.
- Deepen my expertise in RabbitMQ patterns, Kubernetes, and CI/CD pipelines.
- Open-source the project to collaborate and learn from the community.

My passion for building scalable, user-focused systems drives me to explore complex challenges in competitive programming platforms and beyond.

## Contributing

See [Contributing](docs/contributing.md) for guidelines.


## Contact

Reach out for questions or collaboration:
- GitHub: [yourusername](https://github.com/yourusername)
- Email: your.email@example.com

---

*Built with passion to learn, create, and inspire.*