import mongoose, { Schema, Document } from 'mongoose';

export interface IReturn extends Document {
  order: mongoose.Types.ObjectId;
  orderNumber: string;
  customer: {
    name: string;
    email: string;
    phone: string;
  };
  items: {
    product: mongoose.Types.ObjectId;
    name: string;
    quantity: number;
    reason: string;
  }[];
  status: 'requested' | 'approved' | 'rejected' | 'completed';
  refundAmount: number;
  refundMethod: string;
  refundStatus: 'pending' | 'processed';
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

const ReturnSchema = new Schema<IReturn>(
  {
    order: {
      type: Schema.Types.ObjectId,
      ref: 'Order',
      required: true,
    },
    orderNumber: {
      type: String,
      required: true,
    },
    customer: {
      name: String,
      email: String,
      phone: String,
    },
    items: [{
      product: { type: Schema.Types.ObjectId, ref: 'Product' },
      name: String,
      quantity: Number,
      reason: String,
    }],
    status: {
      type: String,
      enum: ['requested', 'approved', 'rejected', 'completed'],
      default: 'requested',
    },
    refundAmount: {
      type: Number,
      required: true,
    },
    refundMethod: {
      type: String,
    },
    refundStatus: {
      type: String,
      enum: ['pending', 'processed'],
      default: 'pending',
    },
    notes: String,
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Return || mongoose.model<IReturn>('Return', ReturnSchema);
