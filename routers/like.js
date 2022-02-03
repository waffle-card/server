import express from 'express';
import 'express-async-errors';

const router = express.Router();

router.post('/', (req, res) => {
  res.json({ message: 'create like' });
});

router.delete('/', (req, res) => {
  res.json({ message: 'delete like' });
});

export default router;
