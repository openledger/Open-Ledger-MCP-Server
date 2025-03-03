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

#### For Claude Desktop or API

```json
{
  "mcpServers": {
    "openledger": {
      "url": "http://localhost:8080/mcp"
    }
  }
}
```

#### For Claude in Anthropic Console

In the Anthropic Console, you can configure the MCP server by adding it to your model settings:

1. Go to the Anthropic Console
2. Select "Claude" and configure a new conversation
3. Click on "Add Tool" and select "MCP Server"
4. Enter the URL: `http://localhost:8080/mcp`
5. Name it "OpenLedger"
6. Click "Add"

#### For Local Development with Claude

If you're developing locally and want Claude to start the server for you:

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

1. **openledger://transactions** - Access and manage financial transactions
2. **openledger://companies** - Access and manage company information
3. **openledger://categories** - Access and manage transaction categories
4. **openledger://reports** - Generate financial reports

Each resource has various actions that Claude can perform, such as getting, creating, updating, and analyzing data.

## Example Interactions

### Viewing Transactions

```
User: Show me the recent transactions for company comp-123.

Claude: I'll retrieve the recent transactions for company comp-123.

[Claude uses the openledger://transactions resource with the getTransactions action]

Here are the recent transactions for company comp-123:

1. Transaction ID: tx1
   Date: January 15, 2023
   Amount: $1,000.00
   Description: Client payment
   Status: CLEARED

2. Transaction ID: tx2
   Date: January 20, 2023
   Amount: -$250.00
   Description: Office supplies
   Status: CLEARED

Total transactions: 2
```

### Creating a Transaction

```
User: Create a new transaction for $500 paid to Office Supplies Inc. for company comp-123.

Claude: I'll create a new transaction for company comp-123.

[Claude uses the openledger://transactions resource with the createTransaction action]

I've created a new transaction:

Transaction ID: tx-1234567890
Amount: $500.00
Description: Payment to Office Supplies Inc.
Company ID: comp-123
Created at: [current date and time]

The transaction has been successfully recorded in the system.
```

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