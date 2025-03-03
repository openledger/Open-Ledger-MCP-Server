#!/bin/bash

# docker-run.sh - A convenience script for running the OpenLedger MCP Server in Docker
#
# This shell script automates the process of building and running the server in a Docker container.
# It uses docker-compose to build the image and start the container in detached mode.
# 
# Usage:
#   ./docker-run.sh
#
# This is useful for:
#   1. Quick deployment in containerized environments
#   2. Ensuring consistent runtime environment
#   3. Isolating the application and its dependencies

# Build and run the Docker container using docker-compose
echo "Building and starting OpenLedger MCP Server in Docker..."
docker-compose up --build -d

echo "Container is now running in the background."
echo "To view logs: docker-compose logs -f"
echo "To stop: docker-compose down" 