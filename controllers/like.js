import * as likeRepository from '../data/like.js';
import { isValidId } from './utils.js';

export const createLike = async (req, res) => {
  const { waffleCardId } = req.body;
  const userId = req.userId;

  if (!isValidId(waffleCardId)) {
    return res.status(404).json({
      message: `와플 카드 id ${waffleCardId}은(는) 유효한 id가 아닙니다.`,
    });
  }

  const like = await likeRepository.create(userId, waffleCardId);
  res.status(201).json({ id: like.id, userId, waffleCardId });
};

export const deleteLike = async (req, res) => {
  const { waffleCardId } = req.body;
  const userId = req.userId;

  if (!isValidId(waffleCardId)) {
    return res.status(404).json({
      message: `와플 카드 id ${waffleCardId}은(는) 유효한 id가 아닙니다.`,
    });
  }

  await likeRepository.remove(userId, waffleCardId);
  res.sendStatus(204);
};
