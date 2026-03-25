import { Router } from 'express';
import GamingStats from '../models/GamingStats';

const router = Router();

// GET all gaming stats
router.get('/', async (_req, res, next) => {
  try {
    const stats = await GamingStats.find().sort({ createdAt: -1 });
    res.json(stats);
  } catch (error) {
    next(error);
  }
});

// POST new gaming stats
router.post('/', async (req, res, next) => {
  try {
    const newStats = new GamingStats(req.body);
    const savedStats = await newStats.save();
    res.status(201).json(savedStats);
  } catch (error) {
    next(error);
  }
});

export default router;
