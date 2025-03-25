# Use an official Node.js image as the base
FROM node:18-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the WebSocket port
EXPOSE 8080

# Use nodemon for hot-reloading in development
CMD ["npm", "run", "dev"]
