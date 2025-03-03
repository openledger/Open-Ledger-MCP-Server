import { config } from 'dotenv';
config();

import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { logger } from './utils/logger.js';
import { mcpRoutes } from './routes/mcpRoutes.js';
import { openLedgerRoutes } from './routes/openLedgerRoutes.js';
import ensureDirectories from './utils/ensureDirs.js';

// Ensure required directories exist
ensureDirectories();

// Define error interface
interface AppError extends Error {
  status?: number;
}

// Initialize express app
const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(helmet()); // Security headers
app.use(cors()); // Enable CORS
app.use(express.json({ limit: '10mb' })); // Parse JSON bodies
app.use(express.urlencoded({ extended: true, limit: '10mb' })); // Parse URL-encoded bodies
app.use(morgan('combined', { stream: { write: (message: string) => logger.info(message.trim()) } })); // HTTP request logging

// Health check endpoint
app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Routes
app.use('/mcp', mcpRoutes);
app.use('/api', openLedgerRoutes);

// Error handling middleware
app.use((err: AppError, req: Request, res: Response, next: NextFunction) => {
  logger.error(`Error: ${err.message}`);
  logger.error(err.stack || '');
  
  res.status(err.status || 500).json({
    error: {
      message: err.message || 'Internal Server Error',
      status: err.status || 500
    }
  });
});

// Start server
app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT} in ${process.env.NODE_ENV || 'development'} mode`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason: any, promise: Promise<any>) => {
  logger.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

export default app; // For testing 