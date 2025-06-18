import mongoose, { Document, Schema } from 'mongoose';

export interface IBorrowing extends Document {
  book: mongoose.Types.ObjectId;
  member: mongoose.Types.ObjectId;
  borrowedDate: Date;
  dueDate: Date;
  returnDate?: Date;
  status: 'active' | 'returned' | 'overdue';
  fine?: number;
  createdAt: Date;
  updatedAt: Date;
}

const borrowingSchema = new Schema<IBorrowing>(
  {
    book: {
      type: Schema.Types.ObjectId,
      ref: 'Book',
      required: [true, 'Book is required'],
    },
    member: {
      type: Schema.Types.ObjectId,
      ref: 'Member',
      required: [true, 'Member is required'],
    },
    borrowedDate: {
      type: Date,
      default: Date.now,
    },
    dueDate: {
      type: Date,
      required: [true, 'Due date is required'],
    },
    returnDate: {
      type: Date,
    },
    status: {
      type: String,
      enum: ['active', 'returned', 'overdue'],
      default: 'active',
    },
    fine: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

// Indexes
borrowingSchema.index({ book: 1, member: 1 });
borrowingSchema.index({ status: 1 });
borrowingSchema.index({ dueDate: 1 });

// Calculate fine when returning a book
borrowingSchema.methods.calculateFine = function() {
  if (this.status === 'returned' && this.returnDate) {
    const daysOverdue = Math.max(0, Math.floor((this.returnDate.getTime() - this.dueDate.getTime()) / (1000 * 60 * 60 * 24)));
    this.fine = daysOverdue * 1; // $1 per day fine
  }
  return this.fine;
};

export const Borrowing = mongoose.model<IBorrowing>('Borrowing', borrowingSchema); 