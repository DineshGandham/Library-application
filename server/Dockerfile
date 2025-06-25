FROM node:18-alpine

WORKDIR /app

# Copy package files first for better caching
COPY package*.json ./

# Install dependencies (including dev dependencies for ts-node and nodemon)
RUN npm install

# Copy the rest of the application
COPY . .

# Expose the server port (adjust if different)
EXPOSE 3000

# Start the development server with nodemon
CMD ["npm", "run", "dev"]