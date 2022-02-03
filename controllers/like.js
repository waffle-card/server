import * as likeRepository from '../data/like.js';
import * as waffleCardRepository from '../data/waffleCard.js';
import { isValidId } from './utils.js';

export const createLike = async (req, res) => {
  const { waffleCardId } = req.body;
  const userId = req.userId;

  if (!isValidId(waffleCardId)) {
    return res.status(404).json({
      message: `와플 카드 id ${waffleCardId}은(는) 유효한 id가 아닙니다.`,
    });
  }

  const likes = await likeRepository.getAllByUserId(userId);
  for (let i = 0; i < likes.length; i++) {
    if (likes[i].waffleCardId === waffleCardId) {
      return res.status(400).json({
        message: '이미 좋아요를 누른 와플 카드입니다.',
      });
    }
  }

  const waffleCard = await waffleCardRepository.getById(waffleCardId);
  if (!waffleCard) {
    return res.status(404).json({ message: '존재하지 않는 와플카드입니다.' });
  }

  const like = await likeRepository.create(userId, waffleCardId);
  await waffleCardRepository.countUpLike(waffleCardId);
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

  const likes = await likeRepository.getAllByUserId(userId);
  if (!likes.map(like => like.userId).includes(userId)) {
    return res.status(400).json({
      message: '좋아요를 누른 와플 카드가 아닙니다.',
    });
  }

  const waffleCard = await waffleCardRepository.getById(waffleCardId);

  if (!waffleCard) {
    return res.status(404).json({ message: '존재하지 않는 와플카드입니다.' });
  }

  await likeRepository.remove(userId, waffleCardId);
  await waffleCardRepository.countDownLike(waffleCardId);
  res.sendStatus(204);
};
