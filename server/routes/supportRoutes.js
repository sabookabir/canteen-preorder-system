import express from 'express';
import supabase from '../config/supabase.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// @desc    Create a new support ticket
// @route   POST /api/support
// @access  Private
router.post('/', protect, async (req, res) => {
  try {
    const { type, subject, message } = req.body;

    if (!type || !subject || !message) {
      return res.status(400).json({ message: 'Please fill in all fields' });
    }

    const { data: ticket, error } = await supabase
      .from('support_tickets')
      .insert([{ user_id: req.user._id, type, subject, message }])
      .select()
      .single();

    if (error) throw new Error(error.message);
    res.status(201).json(ticket);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @desc    Get all support tickets (Admin only)
// @route   GET /api/support
// @access  Private/Admin
router.get('/', protect, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(401).json({ message: 'Not authorized as an admin' });
    }

    const { data: tickets, error } = await supabase
      .from('support_tickets')
      .select('*, users!support_tickets_user_id_fkey(name, email)')
      .order('created_at', { ascending: false });

    if (error) throw new Error(error.message);
    res.json(tickets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
