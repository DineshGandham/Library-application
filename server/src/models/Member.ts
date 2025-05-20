import mongoose, { Document, Schema } from 'mongoose';

export interface IMember extends Document {
  name: string;
  email: string;
  phone: string;
  membershipType: 'Regular' | 'Premium' | 'Student';
  booksIssued: number;
  joinDate: Date;
  address?: string;
  dateOfBirth?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const memberSchema = new Schema<IMember>(
  {
    name: {
      type: String,
      required: [true, 'Member name is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      trim: true,
      lowercase: true,
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required'],
      trim: true,
    },
    membershipType: {
      type: String,
      enum: ['Regular', 'Premium', 'Student'],
      default: 'Regular',
    },
    booksIssued: {
      type: Number,
      default: 0,
      min: [0, 'Books issued cannot be negative'],
    },
    joinDate: {
      type: Date,
      default: Date.now,
    },
    address: {
      type: String,
      trim: true,
    },
    dateOfBirth: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

// Indexes
memberSchema.index({ name: 'text', email: 'text', phone: 'text' });

export const Member = mongoose.model<IMember>('Member', memberSchema); 