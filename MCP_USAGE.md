# Using OpenLedger MCP Server with Claude

This guide explains how to use the OpenLedger MCP Server with Claude or other AI assistants that support the Model Context Protocol (MCP).

## What is MCP?

The Model Context Protocol (MCP) is a standard developed by Anthropic that allows AI models like Claude to securely access external tools and data sources. With MCP, Claude can interact with your financial data through the OpenLedger API in a structured way.

## Setting Up Claude with OpenLedger MCP Server

### 1. Start the OpenLedger MCP Server

#### Option A: Local Installation

```bash
# Install dependencies
bun install

# Start the server
bun start
```

#### Option B: Using Docker

```bash
# Build and run with Docker Compose
docker-compose up --build

# Or use the provided script
./docker-run.sh
```

The server will run on port 8080 by default (or the port specified in your .env file).

### 2. Configure Claude to Use the MCP Server

To use the OpenLedger MCP Server with Claude, you need to add it to your Claude configuration:

#### For Local Installation

```json
{
  "mcpServers": {
    "openledger": {
      "command": "bun",
      "args": ["run", "src/index.ts"],
      "cwd": "/path/to/Open-Ledger-MCP-Server"
    }
  }
}
```

#### For Docker Installation

```json
{
  "mcpServers": {
    "openledger": {
      "url": "http://localhost:8080/mcp"
    }
  }
}
```

Alternatively, if you're using Claude Desktop or another client that supports MCP, you can point it to the running server:

```json
{
  "mcpServers": {
    "openledger": {
      "url": "http://localhost:8080/mcp"
    }
  }
}
```

### 3. Interacting with OpenLedger through Claude

Once configured, you can ask Claude to interact with your financial data. Here are some example prompts:

- "Show me the recent transactions for company X"
- "Create a new transaction for $500 paid to Office Supplies Inc."
- "Generate a general ledger report for January 2023"
- "Classify my recent transactions into categories"
- "What's the total revenue for Q1 2023?"

Claude will use the MCP server to fetch data from the OpenLedger API and provide you with the information you need.

## Available Resources

The OpenLedger MCP Server provides access to the following resources:

1. **Transactions** - Access and manage financial transactions
2. **Companies** - Access and manage company information
3. **Categories** - Access and manage transaction categories

Each resource has various actions that Claude can perform, such as getting, creating, updating, and analyzing data.

## Security Considerations

- The MCP server uses JWT authentication to secure API access
- Make sure to use HTTPS in production environments
- Set appropriate permissions for your .env file containing sensitive information
- When using Docker, consider using Docker secrets for sensitive information

## Troubleshooting

If Claude is unable to connect to the OpenLedger MCP Server, check the following:

1. Ensure the server is running and accessible
2. Verify your Claude configuration is correct
3. Check the server logs for any errors
   - For local installation: Check the console or logs directory
   - For Docker: Run `docker-compose logs -f`
4. Make sure your API keys and authentication are valid

For more detailed information, refer to the [MCP documentation](https://modelcontextprotocol.io/examples). 