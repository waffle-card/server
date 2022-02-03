import express from 'express';
import 'express-async-errors';

const router = express.Router();

router.post('/signup', (req, res) => {
  res.json({ message: 'signup' });
});

router.post('/login', (req, res) => {
  res.json({ message: 'login' });
});

router.get('/me', (req, res) => {
  res.json({ message: 'me' });
});

export default router;
