# First stage: build the app
FROM node:18-alpine

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Install dependencies
RUN yarn

# Copy the rest of the app files to the container
COPY . .

# Expose the port that your Express server is listening on
EXPOSE 3000

# Start the server
CMD ["npm", "start"]


