import express, { Request, Response, NextFunction } from 'express';
import { Borrowing } from '../models/Borrowing';
import { Book } from '../models/Book';
import { Member } from '../models/Member';
import { protect, authorize } from '../middleware/auth';
import { AppError } from '../middleware/errorHandler';
import { logger } from '../utils/logger';

const router = express.Router();

// Get all borrowings
router.get('/', protect, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const borrowings = await Borrowing.find()
      .populate('book', 'title author')
      .populate('member', 'name email');
    res.json(borrowings);
  } catch (error) {
    next(error);
  }
});

// Get borrowings by member
router.get('/member/:memberId', protect, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const borrowings = await Borrowing.find({ member: req.params.memberId })
      .populate('book', 'title author')
      .populate('member', 'name email');
    res.json(borrowings);
  } catch (error) {
    next(error);
  }
});

// Borrow a book
router.post('/', protect, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { bookId, memberId, dueDate } = req.body;

    // Check if book exists and is available
    const book = await Book.findById(bookId);
    if (!book) {
      throw new AppError('Book not found', 404);
    }
    if (book.status !== 'Available') {
      throw new AppError('Book is not available for borrowing', 400);
    }

    // Check if member exists and hasn't exceeded borrowing limit
    const member = await Member.findById(memberId);
    if (!member) {
      throw new AppError('Member not found', 404);
    }
    if (member.booksIssued >= 3) {
      throw new AppError('Member has reached maximum borrowing limit', 400);
    }

    // Create borrowing record
    const borrowing = await Borrowing.create({
      book: bookId,
      member: memberId,
      dueDate: new Date(dueDate),
    });

    // Update book status
    book.status = 'Issued';
    await book.save();

    // Update member's books issued count
    member.booksIssued += 1;
    await member.save();

    logger.info(`Book borrowed: ${book.title} by ${member.name}`);
    res.status(201).json(borrowing);
  } catch (error) {
    next(error);
  }
});

// Return a book
router.put('/:id/return', protect, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const borrowing = await Borrowing.findById(req.params.id);
    if (!borrowing) {
      throw new AppError('Borrowing record not found', 404);
    }

    // Update borrowing record
    borrowing.status = 'returned';
    borrowing.returnDate = new Date();
    borrowing.calculateFine();
    await borrowing.save();

    // Update book status
    const book = await Book.findById(borrowing.book);
    if (book) {
      book.status = 'Available';
      await book.save();
    }

    // Update member's books issued count
    const member = await Member.findById(borrowing.member);
    if (member) {
      member.booksIssued = Math.max(0, member.booksIssued - 1);
      await member.save();
    }

    logger.info(`Book returned: ${book?.title} by ${member?.name}`);
    res.json(borrowing);
  } catch (error) {
    next(error);
  }
});

// Get overdue books
router.get('/overdue', protect, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const overdueBorrowings = await Borrowing.find({
      status: 'active',
      dueDate: { $lt: new Date() },
    })
      .populate('book', 'title author')
      .populate('member', 'name email');
    res.json(overdueBorrowings);
  } catch (error) {
    next(error);
  }
});

// Get borrowing statistics
router.get('/stats', protect, authorize('admin', 'librarian'), async (req: Request, res: Response, next: NextFunction) => {
  try {
    const totalBorrowings = await Borrowing.countDocuments();
    const activeBorrowings = await Borrowing.countDocuments({ status: 'active' });
    const overdueBorrowings = await Borrowing.countDocuments({
      status: 'active',
      dueDate: { $lt: new Date() },
    });
    const totalFines = await Borrowing.aggregate([
      { $match: { status: 'returned' } },
      { $group: { _id: null, total: { $sum: '$fine' } } },
    ]);

    res.json({
      totalBorrowings,
      activeBorrowings,
      overdueBorrowings,
      totalFines: totalFines[0]?.total || 0,
    });
  } catch (error) {
    next(error);
  }
});

export default router; 