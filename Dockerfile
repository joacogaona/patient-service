# Use an official Node.js runtime as the base image
FROM node:16

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json first to leverage Docker's cache
COPY package*.json ./

# Install dependencies
RUN yarn install

# Copy the rest of the application code
COPY . .

# Expose port 3001 for the API
EXPOSE 3001

RUN apt-get update && apt-get install -y wait-for-it
# Start the application
CMD ["yarn", "start:dev"]