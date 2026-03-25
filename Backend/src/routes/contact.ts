import express from 'express';
import Contact from '../models/Contact';

const router = express.Router();

// POST /api/contact - Submit a contact form
router.post('/', async (req, res) => {
  try {
    const { name, age, gamingLaptop, subject, message } = req.body;

    // Simple validation
    if (!name || !age || !gamingLaptop || !subject || !message) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const newContact = new Contact({
      name,
      age,
      gamingLaptop,
      subject,
      message,
    });

    await newContact.save();

    res.status(201).json({ 
      success: true, 
      message: 'Connection established! I will get back to you across the void soon.' 
    });
  } catch (error: any) {
    console.error('Contact submission error:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /api/contact - Optional: retrieve all messages (for admin/developer testing)
router.get('/', async (_req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json(contacts);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
