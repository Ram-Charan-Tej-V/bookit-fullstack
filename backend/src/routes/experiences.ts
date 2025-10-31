import { Router } from 'express';
import db from '../db';

const router = Router();

router.get('/', async (req, res) => {
  const result = await db.query('SELECT * FROM experiences ORDER BY id');
  res.json(result.rows);
});

router.get('/:id', async (req, res) => {
  const id = Number(req.params.id);
  const exp = await db.query('SELECT * FROM experiences WHERE id=$1', [id]);
  if (!exp.rows.length) return res.status(404).json({ error: 'Not found' });
  const slots = await db.query('SELECT * FROM slots WHERE experience_id=$1 ORDER BY slot_date, slot_time', [id]);
  res.json({ ...exp.rows[0], slots: slots.rows });
});

export default router;
