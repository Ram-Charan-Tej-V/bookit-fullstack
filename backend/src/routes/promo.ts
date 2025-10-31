import { Router } from 'express';
const router = Router();

router.post('/validate', (req, res) => {
  const { code } = req.body;
  if (!code) return res.status(400).json({ valid: false });
  const c = code.toUpperCase();
  if (c === 'SAVE10') return res.json({ valid: true, type: 'percent', value: 10 });
  if (c === 'FLAT100') return res.json({ valid: true, type: 'flat', value: 100 });
  return res.json({ valid: false });
});

export default router;
