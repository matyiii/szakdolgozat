# Use the official Node.js image
FROM node:16-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json .
COPY package-lock.json .

# Install dependencies
RUN npm install

# Install Vite globally
RUN npm install -g vite

# Copy Vite configuration file
COPY vite.config.ts .

# Copy application files
COPY . .

# Expose port
EXPOSE 3000

# Start React app
CMD ["npm", "run", "dev"]
