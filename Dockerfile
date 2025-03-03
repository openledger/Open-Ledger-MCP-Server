FROM oven/bun:latest

WORKDIR /app

# Copy package.json and install dependencies
COPY package.json ./
RUN bun install

# Copy the rest of the application
COPY . .

# Create logs directory
RUN mkdir -p logs

# Expose the port the app runs on
EXPOSE 8080

# Command to run the application
CMD ["bun", "run", "src/index.ts"] 