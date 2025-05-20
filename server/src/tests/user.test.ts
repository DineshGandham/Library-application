import mongoose from 'mongoose';
import { User } from '../models/User';

describe('User Model Test', () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/library_test');
  });

  afterAll(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
  });

  it('should create & save user successfully', async () => {
    const validUser = new User({
      name: 'Test User',
      email: 'test@example.com',
      password: 'password123',
      role: 'member',
    });
    const savedUser = await validUser.save();

    expect(savedUser._id).toBeDefined();
    expect(savedUser.name).toBe(validUser.name);
    expect(savedUser.email).toBe(validUser.email);
    expect(savedUser.password).toBe(validUser.password);
    expect(savedUser.role).toBe(validUser.role);
  });

  it('should fail to save user without required fields', async () => {
    const userWithoutRequiredField = new User({ name: 'Test User' });
    let err;
    try {
      await userWithoutRequiredField.save();
    } catch (error) {
      err = error;
    }
    expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
  });

  it('should fail to save user with invalid role', async () => {
    const userWithInvalidRole = new User({
      name: 'Test User',
      email: 'test@example.com',
      password: 'password123',
      role: 'invalid_role',
    });
    let err;
    try {
      await userWithInvalidRole.save();
    } catch (error) {
      err = error;
    }
    expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
  });

  it('should fail to save user with invalid email format', async () => {
    const userWithInvalidEmail = new User({
      name: 'Test User',
      email: 'invalid-email',
      password: 'password123',
      role: 'member',
    });
    let err;
    try {
      await userWithInvalidEmail.save();
    } catch (error) {
      err = error;
    }
    expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
  });

  it('should fail to save user with password shorter than 6 characters', async () => {
    const userWithShortPassword = new User({
      name: 'Test User',
      email: 'test@example.com',
      password: '12345',
      role: 'member',
    });
    let err;
    try {
      await userWithShortPassword.save();
    } catch (error) {
      err = error;
    }
    expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
  });
}); 