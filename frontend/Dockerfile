# Node image
FROM node:20-alpine

# Working Directory
WORKDIR /app

# Copy package & package-lock
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy app files
COPY . .

# Expose port
EXPOSE 5173

# File-watching
ENV CHOKIDAR_USEPOLLING=true

# Start
CMD ["npm", "run", "start"]
