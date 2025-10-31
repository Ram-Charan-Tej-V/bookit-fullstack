import express from 'express';
import cors from 'cors';
import experiencesRouter from './routes/experiences';
import bookingsRouter from './routes/bookings';
import promoRouter from './routes/promo';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/experiences', experiencesRouter);
app.use('/api/bookings', bookingsRouter);
app.use('/api/promo', promoRouter);

app.get('/', (_req, res) => res.json({ ok: true }));

export default app;
