import { Request, Response } from 'express';
import Payment from '../models/Payment';

// Get all payments
export const getPayments = async (req: Request, res: Response): Promise<void> => {
  try {
    const payments = await Payment.find()
      .populate('driver', 'name phone')
      .sort({ weekStartDate: -1 });
    res.status(200).json(payments);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching payments', error });
  }
};

// Get payments by week
export const getPaymentsByWeek = async (req: Request, res: Response): Promise<void> => {
  try {
    const { startDate, endDate } = req.query;
    
    if (!startDate || !endDate) {
      res.status(400).json({ message: 'Start date and end date are required' });
      return;
    }

    const payments = await Payment.find({
      weekStartDate: { $gte: new Date(startDate as string) },
      weekEndDate: { $lte: new Date(endDate as string) }
    }).populate('driver', 'name phone');
    
    res.status(200).json(payments);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching payments by week', error });
  }
};

// Get single payment
export const getPayment = async (req: Request, res: Response): Promise<void> => {
  try {
    const payment = await Payment.findById(req.params.id).populate('driver', 'name phone');
    if (!payment) {
      res.status(404).json({ message: 'Payment not found' });
      return;
    }
    res.status(200).json(payment);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching payment', error });
  }
};

// Create new payment
export const createPayment = async (req: Request, res: Response): Promise<void> => {
  try {
    const { driver, weekStartDate, weekEndDate, amount, description } = req.body;
    const payment = new Payment({
      driver,
      weekStartDate,
      weekEndDate,
      amount,
      description
    });
    const savedPayment = await payment.save();
    res.status(201).json(savedPayment);
  } catch (error) {
    res.status(500).json({ message: 'Error creating payment', error });
  }
};

// Update payment
export const updatePayment = async (req: Request, res: Response): Promise<void> => {
  try {
    const { driver, weekStartDate, weekEndDate, amount, description } = req.body;
    const payment = await Payment.findByIdAndUpdate(
      req.params.id,
      { driver, weekStartDate, weekEndDate, amount, description },
      { new: true }
    );
    if (!payment) {
      res.status(404).json({ message: 'Payment not found' });
      return;
    }
    res.status(200).json(payment);
  } catch (error) {
    res.status(500).json({ message: 'Error updating payment', error });
  }
};

// Delete payment
export const deletePayment = async (req: Request, res: Response): Promise<void> => {
  try {
    const payment = await Payment.findByIdAndDelete(req.params.id);
    if (!payment) {
      res.status(404).json({ message: 'Payment not found' });
      return;
    }
    res.status(200).json({ message: 'Payment deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting payment', error });
  }
}; 