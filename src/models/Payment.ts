import mongoose, { Document, Schema } from 'mongoose';
import { IDriver } from './Driver';

export interface IPayment extends Document {
  driver: IDriver['_id'];
  weekStartDate: Date;
  weekEndDate: Date;
  amount: number;
  description: string;
}

const PaymentSchema: Schema = new Schema({
  driver: { type: Schema.Types.ObjectId, ref: 'Driver', required: true },
  weekStartDate: { type: Date, required: true },
  weekEndDate: { type: Date, required: true },
  amount: { type: Number, required: true },
  description: { type: String, required: true }
}, {
  timestamps: true
});

export default mongoose.model<IPayment>('Payment', PaymentSchema); 