import express from 'express';
import 'express-async-errors';
import * as authController from '../controllers/auth.js';
import { validateSignup, validateLogin } from '../middlewares/validator.js';
import { isAuth } from '../middlewares/auth.js';

const router = express.Router();

router.post('/signup', validateSignup, authController.signup);

router.post('/login', validateLogin, authController.login);

router.get('/me', isAuth, authController.me);

export default router;
