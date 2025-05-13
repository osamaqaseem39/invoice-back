"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePayment = exports.updatePayment = exports.createPayment = exports.getPayment = exports.getPaymentsByWeek = exports.getPayments = void 0;
const Payment_1 = __importDefault(require("../models/Payment"));
// Get all payments
const getPayments = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const payments = yield Payment_1.default.find()
            .populate('driver', 'name phone')
            .sort({ weekStartDate: -1 });
        res.status(200).json(payments);
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching payments', error });
    }
});
exports.getPayments = getPayments;
// Get payments by week
const getPaymentsByWeek = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { startDate, endDate } = req.query;
        if (!startDate || !endDate) {
            res.status(400).json({ message: 'Start date and end date are required' });
            return;
        }
        const payments = yield Payment_1.default.find({
            weekStartDate: { $gte: new Date(startDate) },
            weekEndDate: { $lte: new Date(endDate) }
        }).populate('driver', 'name phone');
        res.status(200).json(payments);
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching payments by week', error });
    }
});
exports.getPaymentsByWeek = getPaymentsByWeek;
// Get single payment
const getPayment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const payment = yield Payment_1.default.findById(req.params.id).populate('driver', 'name phone');
        if (!payment) {
            res.status(404).json({ message: 'Payment not found' });
            return;
        }
        res.status(200).json(payment);
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching payment', error });
    }
});
exports.getPayment = getPayment;
// Create new payment
const createPayment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { driver, weekStartDate, weekEndDate, amount, description } = req.body;
        const payment = new Payment_1.default({
            driver,
            weekStartDate,
            weekEndDate,
            amount,
            description
        });
        const savedPayment = yield payment.save();
        res.status(201).json(savedPayment);
    }
    catch (error) {
        res.status(500).json({ message: 'Error creating payment', error });
    }
});
exports.createPayment = createPayment;
// Update payment
const updatePayment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { driver, weekStartDate, weekEndDate, amount, description } = req.body;
        const payment = yield Payment_1.default.findByIdAndUpdate(req.params.id, { driver, weekStartDate, weekEndDate, amount, description }, { new: true });
        if (!payment) {
            res.status(404).json({ message: 'Payment not found' });
            return;
        }
        res.status(200).json(payment);
    }
    catch (error) {
        res.status(500).json({ message: 'Error updating payment', error });
    }
});
exports.updatePayment = updatePayment;
// Delete payment
const deletePayment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const payment = yield Payment_1.default.findByIdAndDelete(req.params.id);
        if (!payment) {
            res.status(404).json({ message: 'Payment not found' });
            return;
        }
        res.status(200).json({ message: 'Payment deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ message: 'Error deleting payment', error });
    }
});
exports.deletePayment = deletePayment;
