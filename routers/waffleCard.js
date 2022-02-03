import express from 'express';
import 'express-async-errors';

const router = express.Router();

// GET /waffleCards
// GET /waffleCards?username=:username
router.get('/', (req, res) => {
  res.json({ message: 'get waffleCards' });
});

// GET /waffleCards/my
router.get('/my', (req, res) => {
  res.json({ message: 'get my waffleCard' });
});

// GET /waffleCards/like
router.get('/like', (req, res) => {
  res.json({ message: 'get liked waffleCard' });
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

export default router;
