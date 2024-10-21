# Use a specific Node version
FROM node:20

# Set the working directory inside the container
WORKDIR /app

# Remove cached node_modules and package-lock.json (if they exist in the build context)
RUN rm -rf node_modules package-lock.json

# Copy package.json and lock file first to take advantage of Docker's cache
COPY package*.json ./

# Install dependencies (use --legacy-peer-deps if necessary)
RUN npm install --legacy-peer-deps

# Copy the rest of the application code
COPY . .

# Build the app
RUN npm run build

# Expose port 3000
EXPOSE 3000

# Run the app
CMD ["npm", "run", "build"]
