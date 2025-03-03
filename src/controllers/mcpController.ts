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

// MCP Controller
export const mcpController = {
  // Get server manifest
  getManifest: (req: Request, res: Response) => {
    logger.info('MCP: Manifest requested');
    
    const manifest: MCPManifest = {
      protocol_version: '1.0.0',
      server_name: 'OpenLedger MCP Server',
      server_version: '1.0.0',
      description: 'MCP server for OpenLedger API providing financial data and transaction management',
      resources: [
        'transactions',
        'companies',
        'categories'
      ]
    };
    
    res.status(200).json(manifest);
  },
  
  // Get available resources
  getResources: (req: Request, res: Response) => {
    logger.info('MCP: Resources requested');
    
    const resources: MCPResource[] = [
      {
        name: 'transactions',
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
          }
        ]
      },
      {
        name: 'companies',
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
          }
        ]
      },
      {
        name: 'categories',
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
          }
        ]
      }
    ];
    
    res.status(200).json(resources);
  },
  
  // Get specific resource
  getResource: (req: Request, res: Response) => {
    const { resource } = req.body;
    logger.info(`MCP: Resource requested: ${resource}`);
    
    // Find the requested resource
    const resources: MCPResource[] = [
      {
        name: 'transactions',
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
          // Additional actions...
        ]
      },
      // Additional resources...
    ];
    
    const resourceData = resources.find(r => r.name === resource);
    
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
    
    // Execute the action based on resource and action name
    // This is where you would integrate with your OpenLedger API
    try {
      // Example implementation - in a real app, this would call your actual API
      if (resource === 'transactions' && action === 'getTransactions') {
        // Call your OpenLedger API to get transactions
        const mockTransactions = [
          {
            id: 'tx1',
            date: new Date().toISOString(),
            amount: 100.00,
            description: 'Sample transaction',
            status: 'CLEARED'
          }
        ];
        
        return res.status(200).json(mockTransactions);
      }
      
      if (resource === 'companies' && action === 'getCompany') {
        // Call your OpenLedger API to get company details
        const mockCompany = {
          id: 'comp1',
          legal_name: 'Sample Company',
          entity_type: 'LLC',
          status: 'ACTIVE'
        };
        
        return res.status(200).json(mockCompany);
      }
      
      // If action not implemented
      return res.status(501).json({ error: 'Action not implemented' });
      
    } catch (error) {
      logger.error(`Error executing action: ${error}`);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
}; 