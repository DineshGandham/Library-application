import express, { Request, Response, NextFunction } from 'express';
import { Book } from '../models/Book';
import { Member } from '../models/Member';
import { protect, authorize } from '../middleware/auth';
import { AppError } from '../middleware/errorHandler';

const router = express.Router();

// Get dashboard statistics
router.get(
  '/stats',
  protect,
  authorize('admin', 'librarian'),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Get total books
      const totalBooks = await Book.countDocuments();

      // Get books by status
      const booksByStatus = await Book.aggregate([
        {
          $group: {
            _id: '$status',
            count: { $sum: 1 },
          },
        },
      ]);

      // Get total members
      const totalMembers = await Member.countDocuments();

      // Get members by membership type
      const membersByType = await Member.aggregate([
        {
          $group: {
            _id: '$membershipType',
            count: { $sum: 1 },
          },
        },
      ]);

      // Get recent books
      const recentBooks = await Book.find()
        .sort({ createdAt: -1 })
        .limit(5)
        .select('title author status');

      // Get recent members
      const recentMembers = await Member.find()
        .sort({ createdAt: -1 })
        .limit(5)
        .select('name email membershipType');

      res.json({
        totalBooks,
        booksByStatus,
        totalMembers,
        membersByType,
        recentBooks,
        recentMembers,
      });
    } catch (error) {
      next(error);
    }
  }
);

export default router; 