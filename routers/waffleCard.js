import express from 'express';
import 'express-async-errors';
import * as waffleCardController from '../controllers/waffleCard.js';
import { isAuth } from '../middlewares/auth.js';

const router = express.Router();

// GET /waffleCards
// GET /waffleCards?username=:username
router.get('/', waffleCardController.getWaffleCards);

// GET /waffleCards/my
router.get('/my', isAuth, waffleCardController.getWaffleCardsByUserId);

// GET /waffleCards/like
router.get('/like', isAuth, (req, res) => {
  res.json({ message: 'get liked waffleCard' });
});

// POST /waffleCards
router.post('/', isAuth, waffleCardController.createWaffleCard);

// PUT /waffleCards/:id
router.put('/:id', isAuth, waffleCardController.updateWaffleCard);

// DELETE /waffleCards/:id
router.delete('/:id', isAuth, waffleCardController.deleteWaffleCard);

export default router;
