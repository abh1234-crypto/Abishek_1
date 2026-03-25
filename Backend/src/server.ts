import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

import gamingStatsRouter from './routes/gamingStats';
import academicRecordsRouter from './routes/academicRecords';
import attendanceRouter from './routes/attendance';
import contactRouter from './routes/contact';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// ── Middleware ───────────────────────────────────────────────────
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ── CORS Configuration ───────────────────────────────────────────
// Simplified to allow your Vercel URL and Localhost without slash errors
const allowedOrigins = [
  'https://abishek-1.vercel.app',
  'http://localhost:3000',
  'http://localhost:3001',
  'http://localhost:3002',
];

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps or curl) 
      // or if the origin is in our allowed list
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        console.log("Blocked by CORS:", origin); // Helps you see what was blocked in Render logs
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
  })
);

// ── Health check ─────────────────────────────────────────────────
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// ── Routes ───────────────────────────────────────────────────────
app.use('/api/gaming-stats', gamingStatsRouter);
app.use('/api/academic-records', academicRecordsRouter);
app.use('/api/attendance', attendanceRouter);
app.use('/api/contact', contactRouter);

// ── 404 handler ──────────────────────────────────────────────────
app.use((_req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// ── Error handler ─────────────────────────────────────────────────
app.use((err: Error, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: err.message || 'Internal server error' });
});

// ── MongoDB connection + start ────────────────────────────────────
const MONGO_URI = process.env.MONGODB_URI;

if (!MONGO_URI) {
  console.error('❌ MONGODB_URI is missing in .env file');
  process.exit(1);
}

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB connected');
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err.message);
    process.exit(1);
  });

export default app;