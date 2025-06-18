import { Request, Response, NextFunction } from 'express';
import { AppError, errorHandler } from '../middleware/errorHandler';

describe('Error Handler Test', () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let nextFunction: NextFunction;

  beforeEach(() => {
    mockRequest = {};
    mockResponse = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };
    nextFunction = jest.fn();
  });

  it('should handle AppError correctly', () => {
    const error = new AppError('Test error', 400);
    errorHandler(error, mockRequest as Request, mockResponse as Response, nextFunction);

    expect(mockResponse.status).toHaveBeenCalledWith(400);
    expect(mockResponse.json).toHaveBeenCalledWith({
      status: 'error',
      message: 'Test error',
    });
  });

  it('should handle validation error correctly', () => {
    const error = new Error('Validation failed');
    error.name = 'ValidationError';
    errorHandler(error, mockRequest as Request, mockResponse as Response, nextFunction);

    expect(mockResponse.status).toHaveBeenCalledWith(400);
    expect(mockResponse.json).toHaveBeenCalledWith({
      status: 'error',
      message: 'Validation failed',
    });
  });

  it('should handle cast error correctly', () => {
    const error = new Error('Invalid ID');
    error.name = 'CastError';
    errorHandler(error, mockRequest as Request, mockResponse as Response, nextFunction);

    expect(mockResponse.status).toHaveBeenCalledWith(400);
    expect(mockResponse.json).toHaveBeenCalledWith({
      status: 'error',
      message: 'Invalid ID',
    });
  });

  it('should handle duplicate key error correctly', () => {
    const error = new Error('Duplicate field value');
    error.name = 'MongoError';
    (error as any).code = 11000;
    errorHandler(error, mockRequest as Request, mockResponse as Response, nextFunction);

    expect(mockResponse.status).toHaveBeenCalledWith(400);
    expect(mockResponse.json).toHaveBeenCalledWith({
      status: 'error',
      message: 'Duplicate field value',
    });
  });

  it('should handle JWT error correctly', () => {
    const error = new Error('Invalid token');
    error.name = 'JsonWebTokenError';
    errorHandler(error, mockRequest as Request, mockResponse as Response, nextFunction);

    expect(mockResponse.status).toHaveBeenCalledWith(401);
    expect(mockResponse.json).toHaveBeenCalledWith({
      status: 'error',
      message: 'Invalid token',
    });
  });

  it('should handle JWT expired error correctly', () => {
    const error = new Error('Token expired');
    error.name = 'TokenExpiredError';
    errorHandler(error, mockRequest as Request, mockResponse as Response, nextFunction);

    expect(mockResponse.status).toHaveBeenCalledWith(401);
    expect(mockResponse.json).toHaveBeenCalledWith({
      status: 'error',
      message: 'Token expired',
    });
  });

  it('should handle unknown error correctly', () => {
    const error = new Error('Unknown error');
    errorHandler(error, mockRequest as Request, mockResponse as Response, nextFunction);

    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockResponse.json).toHaveBeenCalledWith({
      status: 'error',
      message: 'Something went wrong',
    });
  });
}); 