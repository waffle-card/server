import express from 'express';
import 'express-async-errors';
import * as waffleCardController from '../controllers/waffleCard.js';
import { isAuth } from '../middlewares/auth.js';

const router = express.Router();

router.get('/', waffleCardController.getWaffleCards);

router.get('/my', isAuth, waffleCardController.getWaffleCardByUserId);

router.get('/like', isAuth, waffleCardController.getWaffleCardsByUserLiked);

router.get('/:id', waffleCardController.getWaffleCardById);

router.post('/', isAuth, waffleCardController.createWaffleCard);

router.put('/:id', isAuth, waffleCardController.updateWaffleCard);

router.delete('/:id', isAuth, waffleCardController.deleteWaffleCard);

export default router;
