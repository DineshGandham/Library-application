import express, { Request, Response, NextFunction } from 'express';
import { Member } from '../models/Member';
import { AppError } from '../middleware/errorHandler';
import { logger } from '../utils/logger';

const router = express.Router();

// Get all members
router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const members = await Member.find();
    res.json(members);
  } catch (error) {
    next(error);
  }
});

// Get member by ID
router.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const member = await Member.findById(req.params.id);
    if (!member) {
      throw new AppError('Member not found', 404);
    }
    res.json(member);
  } catch (error) {
    next(error);
  }
});

// Create new member
router.post('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const member = new Member(req.body);
    await member.save();
    logger.info(`New member registered: ${member.name}`);
    res.status(201).json(member);
  } catch (error) {
    next(error);
  }
});

// Update member
router.put('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const member = await Member.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!member) {
      throw new AppError('Member not found', 404);
    }
    logger.info(`Member updated: ${member.name}`);
    res.json(member);
  } catch (error) {
    next(error);
  }
});

// Delete member
router.delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const member = await Member.findByIdAndDelete(req.params.id);
    if (!member) {
      throw new AppError('Member not found', 404);
    }
    logger.info(`Member deleted: ${member.name}`);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
});

// Search members
router.get('/search/:query', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const members = await Member.find({
      $text: { $search: req.params.query },
    });
    res.json(members);
  } catch (error) {
    next(error);
  }
});

export default router; 