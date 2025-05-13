"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const paymentController_1 = require("../controllers/paymentController");
const router = express_1.default.Router();
// GET all payments
router.get('/', paymentController_1.getPayments);
// GET payments by week
router.get('/week', paymentController_1.getPaymentsByWeek);
// GET single payment
router.get('/:id', paymentController_1.getPayment);
// POST new payment
router.post('/', paymentController_1.createPayment);
// PUT update payment
router.put('/:id', paymentController_1.updatePayment);
// DELETE payment
router.delete('/:id', paymentController_1.deletePayment);
exports.default = router;
