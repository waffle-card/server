import * as waffleCardRepository from '../data/waffleCard.js';
import * as userRepository from '../data/auth.js';
import * as likeRepository from '../data/like.js';
import * as commentRepository from '../data/comment.js';
import { isValidId } from './utils.js';

const createWaffleCardInfo = async waffleCard => {
  const { id, user, emoji, color, hashTags, createdAt, updatedAt } = waffleCard;
  const likes = await likeRepository.getAllByWaffleCardId(waffleCard.id);
  const likeUserIds = likes.map(like => like.userId);
  return {
    id,
    user,
    emoji,
    color,
    hashTags,
    createdAt,
    updatedAt,
    likeUserIds,
  };
};

const createWaffleCardsInfos = async waffleCards => {
  const waffleCardInfos = await Promise.all(
    waffleCards.map(waffleCard => {
      return createWaffleCardInfo(waffleCard);
    })
  );
  return waffleCardInfos;
};

export const getWaffleCards = async (req, res) => {
  const waffleCards = await waffleCardRepository.getAll();
  const waffleCardsInfos = await createWaffleCardsInfos(waffleCards);
  res.status(200).json(waffleCardsInfos);
};

export const getWaffleCardById = async (req, res) => {
  const waffleCardId = req.params.id;
  if (!isValidId(waffleCardId)) {
    return res.status(404).json({ message: `유효한 id 형식이 아닙니다.` });
  }
  const waffleCard = await waffleCardRepository.getById(waffleCardId);

  if (!waffleCard) {
    return res.status(404).json({ message: `와플카드가 존재하지 않습니다.` });
  }

  const waffleCardInfo = await createWaffleCardInfo(waffleCard);
  res.status(200).json(waffleCardInfo);
};

export const getWaffleCardsByUserId = async (req, res) => {
  const userId = req.userId;
  const waffleCards = await waffleCardRepository.getAllByUserId(userId);
  const waffleCardsInfos = await createWaffleCardsInfos(waffleCards);
  res.status(200).json(waffleCardsInfos);
};

export const getWaffleCardsByUserLiked = async (req, res) => {
  const userId = req.userId;
  const likes = await likeRepository.getAllByUserId(userId);
  const waffleCardIds = likes.map(like => like.waffleCardId);
  const waffleCards = await waffleCardRepository.getAllByIds(waffleCardIds);
  const waffleCardsInfos = await createWaffleCardsInfos(waffleCards);
  res.status(200).json(waffleCardsInfos);
};

export const createWaffleCard = async (req, res) => {
  const { emoji, color, hashTags } = req.body;
  const user = await userRepository.findById(req.userId);
  const waffleCard = await waffleCardRepository.create(user.id, {
    emoji,
    color,
    hashTags,
  });

  const waffleCardInfo = await createWaffleCardInfo(waffleCard);
  res.status(200).json(waffleCardInfo);
};

export const updateWaffleCard = async (req, res) => {
  const waffleCardId = req.params.id;
  const waffleCard = await waffleCardRepository.getById(waffleCardId);

  if (!waffleCard) {
    return res.status(404).json({ message: `와플카드가 존재하지 않습니다.` });
  }

  if (waffleCard.user.id !== req.userId) {
    return res.status(403).json({ message: `수정 권한이 없습니다.` });
  }

  const { emoji, color, hashTags } = req.body;
  const updatedWaffleCard = await waffleCardRepository.update(waffleCardId, {
    emoji,
    color,
    hashTags,
  });
  const waffleCardInfo = await createWaffleCardInfo(updatedWaffleCard);
  res.status(200).json(waffleCardInfo);
};

export const deleteWaffleCard = async (req, res, next) => {
  const waffleCardId = req.params.id;

  if (!isValidId(waffleCardId)) {
    return res
      .status(404)
      .json({ message: `id ${waffleCardId}은(는) 유효한 id가 아닙니다.` });
  }

  const waffleCard = await waffleCardRepository.getById(waffleCardId);

  if (!waffleCard) {
    return res
      .status(404)
      .json({ message: `id ${waffleCardId}의 와플카드는 존재하지 않습니다.` });
  }

  if (waffleCard.user.id !== req.userId) {
    return res.status(403).json({ message: `삭제 권한이 없습니다.` });
  }

  await waffleCardRepository.remove(waffleCardId);
  await likeRepository.removeAllByWaffleCardId(waffleCardId);
  await commentRepository.removeAllByWaffleCardId(waffleCardId);
  res.sendStatus(204);
};
