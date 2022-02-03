import * as likeRepository from '../data/like.js';
import { isValidId } from './utils.js';

export const createLike = async (req, res) => {
  const { waffleCardId } = req.body;
  const userId = req.userId;

  const like = await likeRepository.create(userId, waffleCardId);
  res.status(201).json({ id: like.id, userId, waffleCardId });
};

export const deleteLike = async (req, res) => {
  const { waffleCardId } = req.body;
  const userId = req.userId;
  console.log(waffleCardId, userId);

  await likeRepository.remove(userId, waffleCardId);
  res.sendStatus(204);
};
