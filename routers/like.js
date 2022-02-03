import express from 'express';
import 'express-async-errors';
import * as likeController from '../controllers/like.js';
import { isAuth } from '../middlewares/auth.js';

const router = express.Router();

router.post('/', isAuth, likeController.createLike);

router.delete('/', isAuth, likeController.deleteLike);

export default router;
