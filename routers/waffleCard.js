import express from 'express';
import 'express-async-errors';
import * as waffleCardController from '../controllers/waffleCard.js';
import { isAuth } from '../middlewares/auth.js';

const router = express.Router();

// GET /waffleCards
// GET /waffleCards?username=:username
router.get('/', waffleCardController.getWaffleCards);

// GET /waffleCards/my
router.get('/my', isAuth, (req, res) => {
  res.json({ message: 'get my waffleCard' });
});

// GET /waffleCards/like
router.get('/like', isAuth, (req, res) => {
  res.json({ message: 'get liked waffleCard' });
});

// POST /waffleCards
router.post('/', isAuth, waffleCardController.createWaffleCard);

// PUT /waffleCards/:id
router.put('/:id', isAuth, (req, res) => {
  res.json({ message: 'update waffleCard by id' });
});

// DELETE /waffleCards/:id
router.delete('/:id', isAuth, (req, res) => {
  res.json({ message: 'delete waffleCard by id' });
});

export default router;
