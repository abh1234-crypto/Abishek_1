import { Router } from 'express';
import Attendance from '../models/Attendance';

const router = Router();

// GET all attendance records
router.get('/', async (_req, res, next) => {
  try {
    const records = await Attendance.find().sort({ createdAt: -1 });
    res.json(records);
  } catch (error) {
    next(error);
  }
});

// POST new attendance
router.post('/', async (req, res, next) => {
  try {
    const newAttendance = new Attendance(req.body);
    const savedAttendance = await newAttendance.save();
    res.status(201).json(savedAttendance);
  } catch (error) {
    next(error);
  }
});

export default router;
