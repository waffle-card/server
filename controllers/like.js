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

  const waffleCard = await waffleCardRepository.getById(waffleCardId);
  if (!waffleCard) {
    return res.status(404).json({ message: '존재하지 않는 와플카드입니다.' });
  }

  const likes = await likeRepository.getAllByUserId(userId);
  for (let i = 0; i < likes.length; i++) {
    if (likes[i].waffleCardId === waffleCardId) {
      return res.status(400).json({
        message: '이미 좋아요를 누른 와플 카드입니다.',
      });
    }
  }

  const like = await likeRepository.create(userId, waffleCardId);

  res.status(201).json(like);
};

export const deleteLike = async (req, res) => {
  const { waffleCardId } = req.body;
  const userId = req.userId;

  if (!isValidId(waffleCardId)) {
    return res.status(404).json({
      message: `와플 카드 id ${waffleCardId}은(는) 유효한 id가 아닙니다.`,
    });
  }

  const waffleCard = await waffleCardRepository.getById(waffleCardId);

  if (!waffleCard) {
    return res.status(404).json({ message: '존재하지 않는 와플카드입니다.' });
  }

  const like = await likeRepository.getByUserIdAndWaffleCardId(
    userId,
    waffleCardId
  );

  if (!like) {
    return res.status(400).json({
      message: '좋아요를 누른 와플 카드가 아닙니다.',
    });
  }

  if (!like.id) {
    return res.status(500).json({
      message: '서버에러가 발생했습니다. 좋아요 ID를 찾지 못했습니다.',
    });
  }

  await likeRepository.remove(like.id);

  res.sendStatus(204);
};
