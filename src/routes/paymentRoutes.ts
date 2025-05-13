import express from 'express';
import {
  getPayments,
  getPaymentsByWeek,
  getPayment,
  createPayment,
  updatePayment,
  deletePayment
} from '../controllers/paymentController';

const router = express.Router();

// GET all payments
router.get('/', getPayments);

// GET payments by week
router.get('/week', getPaymentsByWeek);

// GET single payment
router.get('/:id', getPayment);

// POST new payment
router.post('/', createPayment);

// PUT update payment
router.put('/:id', updatePayment);

// DELETE payment
router.delete('/:id', deletePayment);

export default router; 