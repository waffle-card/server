import express from 'express';
import 'express-async-errors';
import * as authController from '../controllers/auth.js';

const router = express.Router();

router.post('/signup', authController.signup);

router.post('/login', (req, res) => {
  res.json({ message: 'login' });
});

router.get('/me', (req, res) => {
  res.json({ message: 'me' });
});

export default router;
