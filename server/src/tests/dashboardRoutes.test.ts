import mongoose from 'mongoose';
import request from 'supertest';
import { Book } from '../models/Book';
import { Member } from '../models/Member';
import { User } from '../models/User';
import jwt from 'jsonwebtoken';
import app from '../index';

describe('Dashboard Routes Test', () => {
  let token: string;
  let adminUser: any;

  beforeAll(async () => {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/library_test');

    // Create admin user
    adminUser = await User.create({
      name: 'Admin User',
      email: 'admin@test.com',
      password: 'password123',
      role: 'admin',
    });

    // Generate token
    token = jwt.sign(
      { userId: adminUser._id },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '1d' }
    );
  });

  afterAll(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
  });

  beforeEach(async () => {
    await Book.deleteMany({});
    await Member.deleteMany({});
  });

  describe('GET /api/dashboard/stats', () => {
    it('should get dashboard statistics', async () => {
      // Create test data
      await Book.create([
        {
          title: 'Test Book 1',
          author: 'Test Author 1',
          isbn: '1234567890',
          status: 'available',
          category: 'Fiction',
        },
        {
          title: 'Test Book 2',
          author: 'Test Author 2',
          isbn: '0987654321',
          status: 'issued',
          category: 'Non-Fiction',
        },
      ]);

      await Member.create([
        {
          name: 'Test Member 1',
          email: 'test1@example.com',
          phone: '1234567890',
          membershipType: 'standard',
          booksIssued: 0,
          joinDate: new Date(),
        },
        {
          name: 'Test Member 2',
          email: 'test2@example.com',
          phone: '0987654321',
          membershipType: 'premium',
          booksIssued: 1,
          joinDate: new Date(),
        },
      ]);

      const response = await request(app)
        .get('/api/dashboard/stats')
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(200);
      expect(response.body.totalBooks).toBe(2);
      expect(response.body.totalMembers).toBe(2);
      expect(response.body.booksByStatus).toHaveLength(2);
      expect(response.body.membersByType).toHaveLength(2);
      expect(response.body.recentBooks).toHaveLength(2);
      expect(response.body.recentMembers).toHaveLength(2);
    });

    it('should return 401 if not authenticated', async () => {
      const response = await request(app).get('/api/dashboard/stats');
      expect(response.status).toBe(401);
    });

    it('should return 403 if not admin or librarian', async () => {
      // Create a regular member user
      const memberUser = await User.create({
        name: 'Member User',
        email: 'member@test.com',
        password: 'password123',
        role: 'member',
      });

      const memberToken = jwt.sign(
        { userId: memberUser._id },
        process.env.JWT_SECRET || 'your-secret-key',
        { expiresIn: '1d' }
      );

      const response = await request(app)
        .get('/api/dashboard/stats')
        .set('Authorization', `Bearer ${memberToken}`);

      expect(response.status).toBe(403);
    });
  });
}); 