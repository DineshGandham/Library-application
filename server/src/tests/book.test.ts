import mongoose from 'mongoose';
import { Book } from '../models/Book';

describe('Book Model Test', () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/library_test');
  });

  afterAll(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
  });

  it('should create & save book successfully', async () => {
    const validBook = new Book({
      title: 'Test Book',
      author: 'Test Author',
      isbn: '1234567890',
      status: 'available',
      category: 'Fiction',
      description: 'Test description',
      publishedYear: 2023,
      publisher: 'Test Publisher',
    });
    const savedBook = await validBook.save();

    expect(savedBook._id).toBeDefined();
    expect(savedBook.title).toBe(validBook.title);
    expect(savedBook.author).toBe(validBook.author);
    expect(savedBook.isbn).toBe(validBook.isbn);
    expect(savedBook.status).toBe(validBook.status);
    expect(savedBook.category).toBe(validBook.category);
    expect(savedBook.description).toBe(validBook.description);
    expect(savedBook.publishedYear).toBe(validBook.publishedYear);
    expect(savedBook.publisher).toBe(validBook.publisher);
  });

  it('should fail to save book without required fields', async () => {
    const bookWithoutRequiredField = new Book({ title: 'Test Book' });
    let err;
    try {
      await bookWithoutRequiredField.save();
    } catch (error) {
      err = error;
    }
    expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
  });

  it('should fail to save book with invalid status', async () => {
    const bookWithInvalidStatus = new Book({
      title: 'Test Book',
      author: 'Test Author',
      isbn: '1234567890',
      status: 'invalid_status',
      category: 'Fiction',
    });
    let err;
    try {
      await bookWithInvalidStatus.save();
    } catch (error) {
      err = error;
    }
    expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
  });
}); 