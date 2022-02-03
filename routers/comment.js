import express from 'express';
import 'express-async-errors';
import * as commentController from '../controllers/comment.js';
import { isAuth } from '../middlewares/auth.js';

const router = express.Router();

// GET /comments
// GET /comments?waffleCardId=:waffleCardId
router.get('/', commentController.getCommentsByWaffleCardId);

// GET /comments/:id
router.get('/:id', (req, res) => {
  res.json({ message: 'get comment by id' });
});

// POST /comments
router.post('/', isAuth, commentController.createComment);

// PUT /comments/:id
router.put('/:id', isAuth, commentController.updateComment);

// DELETE /comments/:id
router.delete('/:id', isAuth, commentController.deleteComment);

export default router;
