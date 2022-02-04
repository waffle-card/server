import express from 'express';
import 'express-async-errors';
import * as commentController from '../controllers/comment.js';
import { isAuth } from '../middlewares/auth.js';

const router = express.Router();

router.get('/', commentController.getCommentsByWaffleCardId);

router.get('/:id', commentController.getCommentById);

router.post('/', isAuth, commentController.createComment);

router.put('/:id', isAuth, commentController.updateComment);

router.delete('/:id', isAuth, commentController.deleteComment);

export default router;
