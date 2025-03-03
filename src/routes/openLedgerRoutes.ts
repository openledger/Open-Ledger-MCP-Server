import express from 'express';
import { openLedgerController } from '../controllers/openLedgerController.js';

const router = express.Router();

// Company endpoints
router.post('/companies', openLedgerController.createCompany);
router.get('/:id/company', openLedgerController.getCompany);
router.put('/:id/company', openLedgerController.updateCompany);
router.delete('/:id/company', openLedgerController.deleteCompany);

// Transaction endpoints
router.get('/:id/transactions', openLedgerController.getTransactions);
router.post('/:id/transactions', openLedgerController.createTransaction);
router.put('/:id/transactions/:transactionId', openLedgerController.updateTransaction);
router.get('/:id/transactions/export', openLedgerController.exportTransactions);
router.get('/:id/transactions/month/:month', openLedgerController.getTransactionsByMonth);
router.get('/:id/transactions/prompt', openLedgerController.promptTransaction);
router.get('/:id/transactions/classify', openLedgerController.classifyTransactions);
router.get('/:id/transactions/general-ledger', openLedgerController.generateGeneralLedger);
router.post('/:id/transactions/bulk', openLedgerController.bulkCreateTransactions);
router.post('/:id/transactions/suggest-categories', openLedgerController.suggestTransactionCategories);

// Category endpoints
router.put('/:id/company/category', openLedgerController.createCategory);
router.get('/:id/company/category', openLedgerController.getCategories);

export const openLedgerRoutes = router; 