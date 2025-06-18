import mongoose, { Document, Schema } from 'mongoose';

export interface IBook extends Document {
  title: string;
  author: string;
  isbn: string;
  status: 'Available' | 'Issued' | 'Reserved';
  category: string;
  description?: string;
  publishedYear?: number;
  publisher?: string;
  coverImage?: string;
  createdAt: Date;
  updatedAt: Date;
}

const bookSchema = new Schema<IBook>(
  {
    title: {
      type: String,
      required: [true, 'Book title is required'],
      trim: true,
    },
    author: {
      type: String,
      required: [true, 'Author name is required'],
      trim: true,
    },
    isbn: {
      type: String,
      required: [true, 'ISBN is required'],
      unique: true,
      trim: true,
    },
    status: {
      type: String,
      enum: ['Available', 'Issued', 'Reserved'],
      default: 'Available',
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    publishedYear: {
      type: Number,
    },
    publisher: {
      type: String,
      trim: true,
    },
    coverImage: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// Indexes
bookSchema.index({ title: 'text', author: 'text', isbn: 'text' });

export const Book = mongoose.model<IBook>('Book', bookSchema); 