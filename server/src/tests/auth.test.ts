import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { protect, authorize } from '../middleware/auth';
import { AppError } from '../middleware/errorHandler';

describe('Auth Middleware Test', () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let nextFunction: NextFunction;

  beforeEach(() => {
    mockRequest = {
      headers: {},
    };
    mockResponse = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };
    nextFunction = jest.fn();
  });

  describe('protect middleware', () => {
    it('should throw error if no token provided', async () => {
      await protect(mockRequest as Request, mockResponse as Response, nextFunction);
      expect(nextFunction).toHaveBeenCalledWith(expect.any(AppError));
    });

    it('should throw error if token format is invalid', async () => {
      mockRequest.headers = {
        authorization: 'InvalidToken',
      };
      await protect(mockRequest as Request, mockResponse as Response, nextFunction);
      expect(nextFunction).toHaveBeenCalledWith(expect.any(AppError));
    });

    it('should throw error if token is invalid', async () => {
      mockRequest.headers = {
        authorization: 'Bearer invalid.token.here',
      };
      await protect(mockRequest as Request, mockResponse as Response, nextFunction);
      expect(nextFunction).toHaveBeenCalledWith(expect.any(AppError));
    });
  });

  describe('authorize middleware', () => {
    it('should throw error if user is not authenticated', () => {
      const middleware = authorize('admin');
      middleware(mockRequest as Request, mockResponse as Response, nextFunction);
      expect(nextFunction).toHaveBeenCalledWith(expect.any(AppError));
    });

    it('should throw error if user role is not authorized', () => {
      mockRequest.user = { role: 'member' };
      const middleware = authorize('admin');
      middleware(mockRequest as Request, mockResponse as Response, nextFunction);
      expect(nextFunction).toHaveBeenCalledWith(expect.any(AppError));
    });

    it('should call next if user role is authorized', () => {
      mockRequest.user = { role: 'admin' };
      const middleware = authorize('admin');
      middleware(mockRequest as Request, mockResponse as Response, nextFunction);
      expect(nextFunction).toHaveBeenCalled();
    });
  });
}); 