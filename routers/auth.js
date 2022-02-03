import express from 'express';
import 'express-async-errors';
import { body } from 'express-validator';
import * as authController from '../controllers/auth.js';
import { validate } from '../middlewares/validator.js';

const router = express.Router();

const validateSignup = [
  body('name').trim().notEmpty().withMessage('유저의 이름은 필수입니다.'),
  body('name')
    .trim()
    .isLength({ min: 2, max: 12 })
    .withMessage('유저의 이름은 2글자에서 12글자까지만 가능합니다.'),
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('유효하지 않은 이메일입니다.'),
  validate,
];

const validateCredential = [
  body('name').trim().notEmpty().withMessage('유저의 이름은 필수입니다.'),
  body('name')
    .trim()
    .isLength({ min: 2, max: 12 })
    .withMessage('유저의 이름은 2글자에서 12글자까지만 가능합니다.'),
  validate,
];

router.post('/signup', validateSignup, authController.signup);

router.post('/login', (req, res) => {
  res.json({ message: 'login' });
});

router.get('/me', (req, res) => {
  res.json({ message: 'me' });
});

export default router;
