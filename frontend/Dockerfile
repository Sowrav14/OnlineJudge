# Use the official Node.js image
FROM node:18-alpine

# Set the working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy the rest of the application files
COPY . .

# Generate Prisma client
RUN npx prisma generate

# Expose the Next.js port
EXPOSE 3000

# Start the application
CMD ["npm", "run", "dev"]
