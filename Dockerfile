# Stage 1: Build the TypeScript application
FROM node:16 as builder

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json 
COPY package*.json ./

# Set NODE_ENV to production to install only production dependencies
ARG NODE_ENV=development
ENV NODE_ENV=${NODE_ENV}

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Compile TypeScript to JavaScript
RUN npm run build

# Stage 2: Run the application
FROM node:16-alpine

# Set the working directory
WORKDIR /app

# Copy the node_modules and dist directories from the builder stage
COPY --from=builder /app/node_modules /app/node_modules
COPY --from=builder /app/dist /app/dist

# Expose the port the app runs on
EXPOSE 3000

# Command to run the application
CMD ["node", "dist/app.js"]
