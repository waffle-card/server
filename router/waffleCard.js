import express from 'express';
import 'express-async-errors';

// GET /waffleCards
// GET /waffleCards?username=:username
router.get('/', (req, res) => {
  res.json({ message: 'get waffleCards' });
});

// GET /waffleCards/:id
router.get('/:id', (req, res) => {
  res.json({ message: 'get waffleCard by id' });
});

// POST /waffleCards
router.post('/', (req, res) => {
  res.json({ message: 'create waffleCard' });
});

// PUT /waffleCards/:id
router.put('/:id', (req, res) => {
  res.json({ message: 'update waffleCard by id' });
});

// DELETE /waffleCards/:id
router.delete('/:id', (req, res) => {
  res.json({ message: 'delete waffleCard by id' });
});
