# Base image
FROM node:16.17.0

# Create and set the working directory
WORKDIR /app

# Copy the package.json and package-lock.json files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the React project files
COPY . .

# Build the React app
RUN npm run build

# Expose port 3000 for the React development server
EXPOSE 3000

COPY ./build/index.html .

# Run the React development server
CMD ["npm", "start"]

