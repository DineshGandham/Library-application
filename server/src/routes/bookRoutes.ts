import express, { Request, Response } from 'express';
import multer, { FileFilterCallback } from 'multer';
import { Book } from '../models/Book';
import { protect } from '../middleware/auth';
import { AppError } from '../middleware/errorHandler';
import { logger } from '../utils/logger';

const router = express.Router();

// Configure multer for file upload
const storage = multer.diskStorage({
  destination: (req: Request, file: Express.Multer.File, cb: (error: Error | null, destination: string) => void) => {
    cb(null, 'uploads/');
  },
  filename: (req: Request, file: Express.Multer.File, cb: (error: Error | null, filename: string) => void) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + '.' + file.originalname.split('.').pop());
  }
});

const fileFilter = (req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Not an image! Please upload only images.'));
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  }
});

// Get all books
router.get('/', async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching books' });
  }
});

// Get a single book
router.get('/:id', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.json(book);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching book' });
  }
});

// Create a new book
router.post('/', protect, upload.single('coverImage'), async (req: Request & { file?: Express.Multer.File }, res) => {
  try {
    const book = new Book({
      ...req.body,
      coverImage: req.file ? `/uploads/${req.file.filename}` : undefined
    });
    await book.save();
    logger.info(`New book created: ${book.title}`);
    res.status(201).json(book);
  } catch (error) {
    res.status(400).json({ message: 'Error creating book' });
  }
});

// Update a book
router.put('/:id', protect, upload.single('coverImage'), async (req: Request & { file?: Express.Multer.File }, res) => {
  try {
    const book = await Book.findByIdAndUpdate(
      req.params.id,
      {
        ...req.body,
        coverImage: req.file ? `/uploads/${req.file.filename}` : undefined
      },
      { new: true }
    );
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    logger.info(`Book updated: ${book.title}`);
    res.json(book);
  } catch (error) {
    res.status(400).json({ message: 'Error updating book' });
  }
});

// Delete a book
router.delete('/:id', protect, async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    logger.info(`Book deleted: ${book.title}`);
    res.json({ message: 'Book deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting book' });
  }
});

// Search books
router.get('/search/:query', async (req: Request, res: Response) => {
  try {
    const books = await Book.find({
      $text: { $search: req.params.query }
    });
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: 'Error searching books' });
  }
});

export default router; 