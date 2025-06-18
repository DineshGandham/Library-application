import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import { User } from '../models/User';
import { Book } from '../models/Book';
import { Member } from '../models/Member';
import { logger } from '../utils/logger';

dotenv.config();

const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/library');
    logger.info('Connected to MongoDB');

    // Clear existing data
    await Promise.all([
      User.deleteMany({}),
      Book.deleteMany({}),
      Member.deleteMany({}),
    ]);
    logger.info('Cleared existing data');

    // Create admin user
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('admin123', salt);
    const admin = await User.create({
      name: 'Admin User',
      email: 'admin@library.com',
      password: hashedPassword,
      role: 'admin',
    });
    logger.info('Created admin user');

    // Create sample books
    const books = await Book.create([
      {
        title: 'The Great Gatsby',
        author: 'F. Scott Fitzgerald',
        isbn: '9780743273565',
        status: 'available',
        category: 'Fiction',
        description: 'A story of the fabulously wealthy Jay Gatsby and his love for the beautiful Daisy Buchanan.',
        publishedYear: 1925,
        publisher: 'Scribner',
      },
      {
        title: 'To Kill a Mockingbird',
        author: 'Harper Lee',
        isbn: '9780446310789',
        status: 'available',
        category: 'Fiction',
        description: 'The story of racial injustice and the loss of innocence in the American South.',
        publishedYear: 1960,
        publisher: 'Grand Central Publishing',
      },
      {
        title: '1984',
        author: 'George Orwell',
        isbn: '9780451524935',
        status: 'available',
        category: 'Science Fiction',
        description: 'A dystopian social science fiction novel and cautionary tale.',
        publishedYear: 1949,
        publisher: 'Signet Classic',
      },
    ]);
    logger.info('Created sample books');

    // Create sample members
    const members = await Member.create([
      {
        name: 'John Doe',
        email: 'john@example.com',
        phone: '1234567890',
        membershipType: 'premium',
        booksIssued: 0,
        joinDate: new Date(),
        address: '123 Main St, City',
        dateOfBirth: new Date('1990-01-01'),
      },
      {
        name: 'Jane Smith',
        email: 'jane@example.com',
        phone: '0987654321',
        membershipType: 'standard',
        booksIssued: 0,
        joinDate: new Date(),
        address: '456 Oak St, Town',
        dateOfBirth: new Date('1992-05-15'),
      },
    ]);
    logger.info('Created sample members');

    logger.info('Database seeded successfully');
    process.exit(0);
  } catch (error) {
    logger.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase(); 