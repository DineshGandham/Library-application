import mongoose from 'mongoose';
import request from 'supertest';
import { Book } from '../models/Book';
import { User } from '../models/User';
import jwt from 'jsonwebtoken';
import app from '../index';

describe('Book Routes Test', () => {
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
  });

  describe('GET /api/books', () => {
    it('should get all books', async () => {
      // Create test books
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
          status: 'available',
          category: 'Non-Fiction',
        },
      ]);

      const response = await request(app)
        .get('/api/books')
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(200);
      expect(response.body).toHaveLength(2);
    });
  });

  describe('GET /api/books/:id', () => {
    it('should get book by id', async () => {
      const book = await Book.create({
        title: 'Test Book',
        author: 'Test Author',
        isbn: '1234567890',
        status: 'available',
        category: 'Fiction',
      });

      const response = await request(app)
        .get(`/api/books/${book._id}`)
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(200);
      expect(response.body.title).toBe('Test Book');
    });

    it('should return 404 if book not found', async () => {
      const response = await request(app)
        .get(`/api/books/${new mongoose.Types.ObjectId()}`)
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(404);
    });
  });

  describe('POST /api/books', () => {
    it('should create new book', async () => {
      const bookData = {
        title: 'New Book',
        author: 'New Author',
        isbn: '1234567890',
        status: 'available',
        category: 'Fiction',
      };

      const response = await request(app)
        .post('/api/books')
        .set('Authorization', `Bearer ${token}`)
        .send(bookData);

      expect(response.status).toBe(201);
      expect(response.body.title).toBe('New Book');
    });

    it('should return 400 if required fields are missing', async () => {
      const response = await request(app)
        .post('/api/books')
        .set('Authorization', `Bearer ${token}`)
        .send({ title: 'Incomplete Book' });

      expect(response.status).toBe(400);
    });
  });

  describe('PUT /api/books/:id', () => {
    it('should update book', async () => {
      const book = await Book.create({
        title: 'Test Book',
        author: 'Test Author',
        isbn: '1234567890',
        status: 'available',
        category: 'Fiction',
      });

      const response = await request(app)
        .put(`/api/books/${book._id}`)
        .set('Authorization', `Bearer ${token}`)
        .send({ title: 'Updated Book' });

      expect(response.status).toBe(200);
      expect(response.body.title).toBe('Updated Book');
    });

    it('should return 404 if book not found', async () => {
      const response = await request(app)
        .put(`/api/books/${new mongoose.Types.ObjectId()}`)
        .set('Authorization', `Bearer ${token}`)
        .send({ title: 'Updated Book' });

      expect(response.status).toBe(404);
    });
  });

  describe('DELETE /api/books/:id', () => {
    it('should delete book', async () => {
      const book = await Book.create({
        title: 'Test Book',
        author: 'Test Author',
        isbn: '1234567890',
        status: 'available',
        category: 'Fiction',
      });

      const response = await request(app)
        .delete(`/api/books/${book._id}`)
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(204);

      const deletedBook = await Book.findById(book._id);
      expect(deletedBook).toBeNull();
    });

    it('should return 404 if book not found', async () => {
      const response = await request(app)
        .delete(`/api/books/${new mongoose.Types.ObjectId()}`)
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(404);
    });
  });

  describe('GET /api/books/search/:query', () => {
    it('should search books', async () => {
      await Book.create([
        {
          title: 'Test Book 1',
          author: 'Test Author 1',
          isbn: '1234567890',
          status: 'available',
          category: 'Fiction',
        },
        {
          title: 'Another Book',
          author: 'Another Author',
          isbn: '0987654321',
          status: 'available',
          category: 'Non-Fiction',
        },
      ]);

      const response = await request(app)
        .get('/api/books/search/Test')
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(200);
      expect(response.body).toHaveLength(1);
      expect(response.body[0].title).toBe('Test Book 1');
    });
  });
}); 