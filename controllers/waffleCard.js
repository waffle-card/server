import * as waffleCardRepository from '../data/waffleCard.js';
import * as userRepository from '../data/auth.js';

export const getWaffleCards = async (req, res) => {
  const waffleCards = await waffleCardRepository.getAll();
  res.status(200).json(waffleCards);
};

export const getWaffleCardsByUserId = async (req, res) => {
  const userId = req.userId;
  const waffleCard = await waffleCardRepository.getByUserId(userId);
  res.status(200).json(waffleCard);
};

export const createWaffleCard = async (req, res) => {
  const { emoji, color, hashTags } = req.body;
  const user = await userRepository.findById(req.userId);
  const waffleCard = await waffleCardRepository.create(user.id, {
    emoji,
    color,
    hashTags,
  });
  res.status(201).json(waffleCard);
};

export const updateWaffleCard = async (req, res) => {
  const waffleCardId = req.params.id;
  const { emoji, color, hashTags } = req.body;
  const waffleCard = await waffleCardRepository.update(waffleCardId, {
    emoji,
    color,
    hashTags,
  });
  res.status(200).json(waffleCard);
};

export const deleteWaffleCard = async (req, res, next) => {
  const waffleCardId = req.params.id;

  if (!waffleCardId.match(/^[0-9a-fA-F]{24}$/)) {
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

  if (waffleCard.userId !== req.userId) {
    return res.status(403).json({ message: `삭제 권한이 없습니다.` });
  }

  await waffleCardRepository.remove(waffleCardId);
  res.sendStatus(204);
};
