# OpenLedger MCP Server

A Model Context Protocol (MCP) server implementation for the OpenLedger API. This server provides structured context to AI models according to the MCP specification.

## What is MCP?

The Model Context Protocol (MCP) is a standard for providing context to AI models. It allows for structured data exchange between applications and AI models, enabling more effective and contextual AI interactions.

Learn more at [modelcontextprotocol.io](https://modelcontextprotocol.io).

## Features

- MCP-compliant server implementation
- Integration with OpenLedger API
- Context-aware AI interactions for financial data
- Support for transactions, companies, and other financial entities

## Installation

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

## Development

```bash
# Run in development mode with hot reloading
bun dev

# Run tests
bun test

# Build for production
bun run build
```

## Using with Claude

See [MCP_USAGE.md](MCP_USAGE.md) for detailed instructions on how to use this server with Claude or other AI assistants that support the Model Context Protocol.

## API Documentation

The server implements the OpenLedger API as specified in the OpenAPI documentation. Key endpoints include:

- Transaction management
- Company management
- Financial reporting
- AI-assisted categorization

## MCP Implementation

This server implements the Model Context Protocol to provide structured context to AI models. The implementation follows the specification at [modelcontextprotocol.io/examples](https://modelcontextprotocol.io/examples).

## Scripts

- `run.sh` - A shell script to install dependencies and start the server locally
- `docker-run.sh` - A shell script to build and run the server in a Docker container

## License

See the [LICENSE](LICENSE) file for details. 