import express, { Request, Response, NextFunction } from 'express';
import multer from 'multer';
import path from 'path';
import { Book } from '../models/Book';
import { AppError } from '../middleware/errorHandler';
import { logger } from '../utils/logger';

const router = express.Router();

// Configure multer for file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only JPEG, PNG and GIF are allowed.'));
    }
  },
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  }
});

// Get all books
router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (error) {
    next(error);
  }
});

// Get book by ID
router.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      throw new AppError('Book not found', 404);
    }
    res.json(book);
  } catch (error) {
    next(error);
  }
});

// Create new book
router.post('/', upload.single('coverImage'), async (req: Request, res: Response, next: NextFunction) => {
  try {
    const bookData = {
      ...req.body,
      coverImage: req.file ? `/uploads/${req.file.filename}` : undefined
    };
    const book = new Book(bookData);
    await book.save();
    logger.info(`New book created: ${book.title}`);
    res.status(201).json(book);
  } catch (error) {
    next(error);
  }
});

// Update book
router.put('/:id', upload.single('coverImage'), async (req: Request, res: Response, next: NextFunction) => {
  try {
    const bookData = {
      ...req.body,
      coverImage: req.file ? `/uploads/${req.file.filename}` : undefined
    };
    const book = await Book.findByIdAndUpdate(req.params.id, bookData, {
      new: true,
      runValidators: true,
    });
    if (!book) {
      throw new AppError('Book not found', 404);
    }
    logger.info(`Book updated: ${book.title}`);
    res.json(book);
  } catch (error) {
    next(error);
  }
});

// Delete book
router.delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);
    if (!book) {
      throw new AppError('Book not found', 404);
    }
    logger.info(`Book deleted: ${book.title}`);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
});

// Search books
router.get('/search/:query', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const books = await Book.find({
      $text: { $search: req.params.query },
    });
    res.json(books);
  } catch (error) {
    next(error);
  }
});

export default router; 