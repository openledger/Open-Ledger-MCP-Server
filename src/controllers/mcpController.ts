import { Request, Response } from 'express';
import { logger } from '../utils/logger.js';

// Define MCP types
interface MCPManifest {
  protocol_version: string;
  server_name: string;
  server_version: string;
  description: string;
  resources: string[];
}

interface MCPResource {
  name: string;
  description: string;
  actions: MCPAction[];
}

interface MCPAction {
  name: string;
  description: string;
  parameters: MCPParameter[];
  returns: MCPReturn;
}

interface MCPParameter {
  name: string;
  description: string;
  type: string;
  required: boolean;
}

interface MCPReturn {
  type: string;
  description: string;
}

// Define OpenLedger resources and actions
const resources = {
  transactions: {
    name: 'openledger://transactions',
    description: 'Access and manage financial transactions',
    actions: [
      {
        name: 'getTransactions',
        description: 'Get transactions for a company',
        parameters: [
          {
            name: 'companyId',
            description: 'ID of the company',
            type: 'string',
            required: true
          },
          {
            name: 'startDate',
            description: 'Start date for filtering transactions (YYYY-MM-DD)',
            type: 'string',
            required: false
          },
          {
            name: 'endDate',
            description: 'End date for filtering transactions (YYYY-MM-DD)',
            type: 'string',
            required: false
          }
        ],
        returns: {
          type: 'array',
          description: 'List of transactions'
        }
      },
      {
        name: 'createTransaction',
        description: 'Create a new transaction',
        parameters: [
          {
            name: 'companyId',
            description: 'ID of the company',
            type: 'string',
            required: true
          },
          {
            name: 'transaction',
            description: 'Transaction data',
            type: 'object',
            required: true
          }
        ],
        returns: {
          type: 'object',
          description: 'Created transaction'
        }
      },
      {
        name: 'classifyTransaction',
        description: 'Classify a transaction into categories',
        parameters: [
          {
            name: 'companyId',
            description: 'ID of the company',
            type: 'string',
            required: true
          },
          {
            name: 'transactionId',
            description: 'ID of the transaction',
            type: 'string',
            required: true
          }
        ],
        returns: {
          type: 'object',
          description: 'Classified transaction with categories'
        }
      },
      {
        name: 'exportTransactions',
        description: 'Export transactions to a file',
        parameters: [
          {
            name: 'companyId',
            description: 'ID of the company',
            type: 'string',
            required: true
          },
          {
            name: 'format',
            description: 'Export format (csv, xlsx, json)',
            type: 'string',
            required: false
          },
          {
            name: 'startDate',
            description: 'Start date for filtering transactions (YYYY-MM-DD)',
            type: 'string',
            required: false
          },
          {
            name: 'endDate',
            description: 'End date for filtering transactions (YYYY-MM-DD)',
            type: 'string',
            required: false
          }
        ],
        returns: {
          type: 'object',
          description: 'Export information including URL to download the file'
        }
      },
      {
        name: 'getTransactionsByMonth',
        description: 'Get transactions for a specific month',
        parameters: [
          {
            name: 'companyId',
            description: 'ID of the company',
            type: 'string',
            required: true
          },
          {
            name: 'month',
            description: 'Month in YYYY-MM format',
            type: 'string',
            required: true
          }
        ],
        returns: {
          type: 'object',
          description: 'List of transactions for the specified month'
        }
      }
    ]
  },
  companies: {
    name: 'openledger://companies',
    description: 'Access and manage company information',
    actions: [
      {
        name: 'getCompany',
        description: 'Get company details',
        parameters: [
          {
            name: 'companyId',
            description: 'ID of the company',
            type: 'string',
            required: true
          }
        ],
        returns: {
          type: 'object',
          description: 'Company details'
        }
      },
      {
        name: 'createCompany',
        description: 'Create a new company',
        parameters: [
          {
            name: 'companyData',
            description: 'Company data',
            type: 'object',
            required: true
          }
        ],
        returns: {
          type: 'object',
          description: 'Created company'
        }
      },
      {
        name: 'updateCompany',
        description: 'Update company details',
        parameters: [
          {
            name: 'companyId',
            description: 'ID of the company',
            type: 'string',
            required: true
          },
          {
            name: 'companyData',
            description: 'Updated company data',
            type: 'object',
            required: true
          }
        ],
        returns: {
          type: 'object',
          description: 'Updated company'
        }
      },
      {
        name: 'deleteCompany',
        description: 'Delete a company',
        parameters: [
          {
            name: 'companyId',
            description: 'ID of the company',
            type: 'string',
            required: true
          }
        ],
        returns: {
          type: 'object',
          description: 'Deletion confirmation'
        }
      }
    ]
  },
  categories: {
    name: 'openledger://categories',
    description: 'Access and manage transaction categories',
    actions: [
      {
        name: 'getCategories',
        description: 'Get categories for a company',
        parameters: [
          {
            name: 'companyId',
            description: 'ID of the company',
            type: 'string',
            required: true
          }
        ],
        returns: {
          type: 'array',
          description: 'List of categories'
        }
      },
      {
        name: 'createCategory',
        description: 'Create a new category',
        parameters: [
          {
            name: 'companyId',
            description: 'ID of the company',
            type: 'string',
            required: true
          },
          {
            name: 'categoryData',
            description: 'Category data',
            type: 'object',
            required: true
          }
        ],
        returns: {
          type: 'object',
          description: 'Created category'
        }
      },
      {
        name: 'suggestCategories',
        description: 'Suggest categories for transactions',
        parameters: [
          {
            name: 'companyId',
            description: 'ID of the company',
            type: 'string',
            required: true
          },
          {
            name: 'transactions',
            description: 'Transactions to categorize',
            type: 'array',
            required: true
          }
        ],
        returns: {
          type: 'array',
          description: 'Suggested categories for each transaction'
        }
      }
    ]
  },
  reports: {
    name: 'openledger://reports',
    description: 'Generate financial reports',
    actions: [
      {
        name: 'generateGeneralLedger',
        description: 'Generate a general ledger report',
        parameters: [
          {
            name: 'companyId',
            description: 'ID of the company',
            type: 'string',
            required: true
          },
          {
            name: 'startDate',
            description: 'Start date for the report (YYYY-MM-DD)',
            type: 'string',
            required: false
          },
          {
            name: 'endDate',
            description: 'End date for the report (YYYY-MM-DD)',
            type: 'string',
            required: false
          }
        ],
        returns: {
          type: 'object',
          description: 'General ledger report'
        }
      }
    ]
  }
};

// MCP Controller
export const mcpController = {
  // Get server manifest
  getManifest: (req: Request, res: Response) => {
    logger.info('MCP: Manifest requested');
    
    const manifest: MCPManifest = {
      protocol_version: process.env.MCP_VERSION || '1.0.0',
      server_name: 'OpenLedger MCP Server',
      server_version: '1.0.0',
      description: 'MCP server for OpenLedger API providing financial data and transaction management',
      resources: Object.keys(resources).map(key => resources[key as keyof typeof resources].name)
    };
    
    res.status(200).json(manifest);
  },
  
  // Get available resources
  getResources: (req: Request, res: Response) => {
    logger.info('MCP: Resources requested');
    
    const resourcesList = Object.values(resources);
    res.status(200).json(resourcesList);
  },
  
  // Get specific resource
  getResource: (req: Request, res: Response) => {
    const { resource } = req.body;
    logger.info(`MCP: Resource requested: ${resource}`);
    
    // Find the requested resource
    const resourceData = Object.values(resources).find(r => r.name === resource);
    
    if (!resourceData) {
      return res.status(404).json({ error: 'Resource not found' });
    }
    
    res.status(200).json(resourceData);
  },
  
  // Execute an action
  executeAction: (req: Request, res: Response) => {
    const { resource, action, parameters } = req.body;
    logger.info(`MCP: Action execution requested: ${resource}.${action}`);
    
    // Validate request
    if (!resource || !action) {
      return res.status(400).json({ error: 'Resource and action are required' });
    }
    
    // Find the resource and action
    const resourceData = Object.values(resources).find(r => r.name === resource);
    if (!resourceData) {
      return res.status(404).json({ error: 'Resource not found' });
    }
    
    const actionData = resourceData.actions.find(a => a.name === action);
    if (!actionData) {
      return res.status(404).json({ error: 'Action not found' });
    }
    
    // Validate parameters
    const requiredParams = actionData.parameters.filter(p => p.required);
    for (const param of requiredParams) {
      if (parameters[param.name] === undefined) {
        return res.status(400).json({ error: `Missing required parameter: ${param.name}` });
      }
    }
    
    // Execute the action based on resource and action name
    try {
      // This is where we would integrate with the actual OpenLedger API
      // For now, we'll return mock data
      
      // Transactions resource
      if (resource === 'openledger://transactions') {
        if (action === 'getTransactions') {
          const { companyId } = parameters;
          const transactions = [
            {
              id: 'tx1',
              date: '2023-01-15T10:30:00Z',
              amount: 1000.00,
              currency: 'USD',
              description: 'Client payment',
              status: 'CLEARED',
              company_id: companyId
            },
            {
              id: 'tx2',
              date: '2023-01-20T14:45:00Z',
              amount: -250.00,
              currency: 'USD',
              description: 'Office supplies',
              status: 'CLEARED',
              company_id: companyId
            }
          ];
          
          return res.status(200).json({ transactions, totalCount: transactions.length });
        }
        
        if (action === 'createTransaction') {
          const { companyId, transaction } = parameters;
          const newTransaction = {
            id: `tx-${Date.now()}`,
            ...transaction,
            company_id: companyId,
            created_at: new Date().toISOString()
          };
          
          return res.status(201).json(newTransaction);
        }
        
        if (action === 'classifyTransaction') {
          const { companyId, transactionId } = parameters;
          const classifiedTransaction = {
            id: transactionId,
            description: 'Office supplies',
            category: 'SGA_EXPENSE',
            confidence: 0.87,
            company_id: companyId
          };
          
          return res.status(200).json(classifiedTransaction);
        }
        
        if (action === 'exportTransactions') {
          const { companyId, format = 'csv' } = parameters;
          const exportInfo = {
            url: `https://example.com/exports/${companyId}_${Date.now()}.${format}`,
            filename: `transactions_${companyId}.${format}`,
            count: 25
          };
          
          return res.status(200).json(exportInfo);
        }
        
        if (action === 'getTransactionsByMonth') {
          const { companyId, month } = parameters;
          const transactions = [
            {
              id: 'tx1',
              date: `${month}-15T10:30:00Z`,
              amount: 1000.00,
              currency: 'USD',
              description: 'Client payment',
              status: 'CLEARED',
              company_id: companyId
            }
          ];
          
          return res.status(200).json({ 
            transactions, 
            totalCount: transactions.length,
            month
          });
        }
      }
      
      // Companies resource
      if (resource === 'openledger://companies') {
        if (action === 'getCompany') {
          const { companyId } = parameters;
          const company = {
            id: companyId,
            legal_name: 'Sample Company',
            tin: '12-3456789',
            us_state: 'CA',
            entity_type: 'LLC',
            status: 'ACTIVE',
            date_created: '2023-01-01T00:00:00Z'
          };
          
          return res.status(200).json(company);
        }
        
        if (action === 'createCompany') {
          const { companyData } = parameters;
          const newCompany = {
            id: `comp-${Date.now()}`,
            ...companyData,
            date_created: new Date().toISOString(),
            status: 'ACTIVE'
          };
          
          return res.status(201).json(newCompany);
        }
        
        if (action === 'updateCompany') {
          const { companyId, companyData } = parameters;
          const updatedCompany = {
            id: companyId,
            ...companyData,
            updated_at: new Date().toISOString()
          };
          
          return res.status(200).json(updatedCompany);
        }
        
        if (action === 'deleteCompany') {
          const { companyId } = parameters;
          return res.status(200).json({ message: 'Company deleted successfully' });
        }
      }
      
      // Categories resource
      if (resource === 'openledger://categories') {
        if (action === 'getCategories') {
          const { companyId } = parameters;
          const categories = [
            {
              id: 1,
              name: 'Revenue',
              type: 'REVENUE',
              companyId,
              account_code: 4000
            },
            {
              id: 2,
              name: 'Office Expenses',
              type: 'SGA_EXPENSE',
              companyId,
              account_code: 6000
            }
          ];
          
          return res.status(200).json(categories);
        }
        
        if (action === 'createCategory') {
          const { companyId, categoryData } = parameters;
          const newCategory = {
            id: Date.now(),
            ...categoryData,
            companyId
          };
          
          return res.status(201).json(newCategory);
        }
        
        if (action === 'suggestCategories') {
          const { companyId, transactions } = parameters;
          const suggestions = transactions.map((tx: any) => ({
            transaction_id: tx.id,
            suggested_categories: [
              'REVENUE',
              'EXPENSE',
              'ASSET'
            ]
          }));
          
          return res.status(200).json(suggestions);
        }
      }
      
      // Reports resource
      if (resource === 'openledger://reports') {
        if (action === 'generateGeneralLedger') {
          const { companyId } = parameters;
          const generalLedger = {
            company_id: companyId,
            period: 'January 2023',
            accounts: [
              {
                account_code: 1000,
                name: 'Cash',
                type: 'ASSET',
                opening_balance: 5000.00,
                closing_balance: 5750.00,
                transactions: [
                  { id: 'tx1', date: '2023-01-15', amount: 1000.00, description: 'Client payment' },
                  { id: 'tx2', date: '2023-01-20', amount: -250.00, description: 'Office supplies' }
                ]
              }
            ]
          };
          
          return res.status(200).json(generalLedger);
        }
      }
      
      // If action not implemented
      return res.status(501).json({ error: 'Action not implemented' });
      
    } catch (error) {
      logger.error(`Error executing action: ${error}`);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
}; 