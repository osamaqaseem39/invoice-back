import mongoose, { Document, Schema } from 'mongoose';

export interface IDriver extends Document {
  name: string;
  phone: string;
}

const DriverSchema: Schema = new Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true }
}, {
  timestamps: true
});

export default mongoose.model<IDriver>('Driver', DriverSchema); 