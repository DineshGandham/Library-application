import mongoose from 'mongoose';
import { Member } from '../models/Member';

describe('Member Model Test', () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/library_test');
  });

  afterAll(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
  });

  it('should create & save member successfully', async () => {
    const validMember = new Member({
      name: 'Test Member',
      email: 'test@example.com',
      phone: '1234567890',
      membershipType: 'standard',
      booksIssued: 0,
      joinDate: new Date(),
      address: '123 Test St',
      dateOfBirth: new Date('1990-01-01'),
    });
    const savedMember = await validMember.save();

    expect(savedMember._id).toBeDefined();
    expect(savedMember.name).toBe(validMember.name);
    expect(savedMember.email).toBe(validMember.email);
    expect(savedMember.phone).toBe(validMember.phone);
    expect(savedMember.membershipType).toBe(validMember.membershipType);
    expect(savedMember.booksIssued).toBe(validMember.booksIssued);
    expect(savedMember.joinDate).toBeDefined();
    expect(savedMember.address).toBe(validMember.address);
    expect(savedMember.dateOfBirth).toBeDefined();
  });

  it('should fail to save member without required fields', async () => {
    const memberWithoutRequiredField = new Member({ name: 'Test Member' });
    let err;
    try {
      await memberWithoutRequiredField.save();
    } catch (error) {
      err = error;
    }
    expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
  });

  it('should fail to save member with invalid membership type', async () => {
    const memberWithInvalidType = new Member({
      name: 'Test Member',
      email: 'test@example.com',
      phone: '1234567890',
      membershipType: 'invalid_type',
    });
    let err;
    try {
      await memberWithInvalidType.save();
    } catch (error) {
      err = error;
    }
    expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
  });

  it('should fail to save member with invalid email format', async () => {
    const memberWithInvalidEmail = new Member({
      name: 'Test Member',
      email: 'invalid-email',
      phone: '1234567890',
      membershipType: 'standard',
    });
    let err;
    try {
      await memberWithInvalidEmail.save();
    } catch (error) {
      err = error;
    }
    expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
  });
}); 