import express from 'express';
import { mcpController } from '../controllers/mcpController.js';

const router = express.Router();

// MCP protocol endpoints
router.post('/', mcpController.getManifest);
router.post('/resources', mcpController.getResources);
router.post('/resource', mcpController.getResource);
router.post('/execute', mcpController.executeAction);

export const mcpRoutes = router; 