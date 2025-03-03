# OpenLedger MCP Server

A Model Context Protocol (MCP) server implementation for the OpenLedger API. This server provides structured context to AI models according to the MCP specification.

## What is OpenLedger?

[OpenLedger](https://openledger.com) is an embedded accounting API that consolidates your customer's financial data into your platform, creating one single source of truth. It can also be used to entirely manage a ledger through an API, making it perfect for AI agents. This MCP server allows AI assistants like Claude to interact with the OpenLedger API in a structured way.

## What is MCP?

The Model Context Protocol (MCP) is a standard for providing context to AI models. It allows for structured data exchange between applications and AI models, enabling more effective and contextual AI interactions.

Learn more at [modelcontextprotocol.io](https://modelcontextprotocol.io).

## Features

- MCP-compliant server implementation
- Integration with [OpenLedger API](https://openledger.com/api)
- Context-aware AI interactions for financial data
- Support for transactions, companies, and other financial entities

## Quick Start

### Option 1: Local Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/Open-Ledger-MCP-Server.git
cd Open-Ledger-MCP-Server

# Install dependencies
bun install

# Set up environment variables
cp .env.example .env
# Edit .env with your configuration

# Start the server
bun start
```

### Option 2: Using Docker

```bash
# Clone the repository
git clone https://github.com/yourusername/Open-Ledger-MCP-Server.git
cd Open-Ledger-MCP-Server

# Build and run with Docker Compose
docker-compose up --build

# Or use the provided script
./docker-run.sh
```

## Using with Claude

To use this MCP server with Claude, add it to your Claude configuration:

```json
{
  "mcpServers": {
    "openledger": {
      "url": "http://localhost:8080/mcp"
    }
  }
}
```

See [MCP_USAGE.md](MCP_USAGE.md) for detailed instructions on how to use this server with Claude or other AI assistants that support the Model Context Protocol.

## Available Resources

The OpenLedger MCP Server provides access to the following resources:

1. **openledger://transactions** - Access and manage financial transactions
2. **openledger://companies** - Access and manage company information
3. **openledger://categories** - Access and manage transaction categories
4. **openledger://reports** - Generate financial reports

## Development

```bash
# Run in development mode with hot reloading
bun dev

# Run tests
bun test

# Build for production
bun run build
```

## Project Structure

```
.
├── src/
│   ├── controllers/       # Request handlers
│   ├── routes/            # API routes
│   ├── utils/             # Utility functions
│   └── index.ts           # Main application entry point
├── .env.example           # Example environment variables
├── docker-compose.yml     # Docker Compose configuration
├── Dockerfile             # Docker configuration
├── MCP_USAGE.md           # Guide for using with Claude
├── package.json           # Project dependencies
├── README.md              # This file
├── run.sh                 # Script to run locally
└── tsconfig.json          # TypeScript configuration
```

## Scripts

- `run.sh` - A shell script to install dependencies and start the server locally
- `docker-run.sh` - A shell script to build and run the server in a Docker container

## License

See the [LICENSE](LICENSE) file for details. 