import { Router } from 'express';
import AcademicRecord from '../models/AcademicRecords';

const router = Router();

// GET all academic records
router.get('/', async (_req, res, next) => {
  try {
    const records = await AcademicRecord.find().sort({ createdAt: -1 });
    res.json(records);
  } catch (error) {
    next(error);
  }
});

// POST new record
router.post('/', async (req, res, next) => {
  try {
    const newRecord = new AcademicRecord(req.body);
    const savedRecord = await newRecord.save();
    res.status(201).json(savedRecord);
  } catch (error) {
    next(error);
  }
});

export default router;
