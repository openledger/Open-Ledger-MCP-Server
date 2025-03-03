#!/bin/bash

# run.sh - A convenience script for running the OpenLedger MCP Server
#
# This shell script automates the process of setting up and running the server.
# It installs dependencies, creates necessary directories, and starts the server.
# 
# Usage:
#   ./run.sh
#
# This is useful for:
#   1. Quick setup for new developers
#   2. Ensuring consistent environment setup
#   3. Simplifying the startup process

# Ensure we have the right dependencies
echo "Installing dependencies..."
bun install

# Create logs directory if it doesn't exist
mkdir -p logs

# Run the server
echo "Starting OpenLedger MCP Server..."
bun run src/index.ts 