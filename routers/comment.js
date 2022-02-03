import express from 'express';
import 'express-async-errors';

const router = express.Router();

// GET /comments
// GET /comments?waffleCardId=:waffleCardId
router.get('/', (req, res) => {
  res.json({ message: 'get comment by waffleCardId' });
});

// GET /comments/:id
router.get('/:id', (req, res) => {
  res.json({ message: 'get comment by id' });
});

// POST /comments
router.post('/', (req, res) => {
  res.json({ message: 'create comment' });
});

// PUT /comments/:id
router.put('/:id', (req, res) => {
  res.json({ message: 'update comment by id' });
});

// DELETE /comments/:id
router.delete('/:id', (req, res) => {
  res.json({ message: 'delete comment by id' });
});

export default router;
