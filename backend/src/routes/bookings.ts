import { Router } from 'express';
import db from '../db';

const router = Router();

router.post('/', async (req, res) => {
  const { experience_id, slot_id, name, email, phone, total_price } = req.body;
  if (!experience_id || !slot_id || !name || !email || !total_price) {
    return res.status(400).json({ error: 'Missing fields' });
  }

  // Prevent double-booking: check capacity
  const slotRes = await db.query('SELECT capacity FROM slots WHERE id=$1', [slot_id]);
  if (!slotRes.rows.length) return res.status(400).json({ error: 'Slot not found' });
  const capacity = slotRes.rows[0].capacity;

  const bookedCountRes = await db.query('SELECT COUNT(*) FROM bookings WHERE slot_id=$1', [slot_id]);
  const bookedCount = Number(bookedCountRes.rows[0].count);
  if (bookedCount >= capacity) return res.status(409).json({ error: 'Slot sold out' });

  const result = await db.query(
    'INSERT INTO bookings (experience_id, slot_id, name, email, phone, total_price) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *',
    [experience_id, slot_id, name, email, phone, total_price]
  );

  res.json({ success: true, booking: result.rows[0] });
});

export default router;
