import express from 'express';
import 'express-async-errors';

// GET /comments
// GET /comments?waffleCardId=:waffleCardId
router.get('/', (req, res) => {
  res.json({ message: 'get comment' });
});

// GET /comments/:id
router.get('/:id', (req, res) => {
  res.json({ message: 'get comment by id' });
});

// POST /comments
router.post('/', (req, res) => {
  res.json({ message: 'create comments' });
});

// PUT /comments/:id
router.put('/:id', (req, res) => {
  res.json({ message: 'update comment by id' });
});

// DELETE /comments/:id
router.delete('/:id', (req, res) => {
  res.json({ message: 'delete comment by id' });
});
