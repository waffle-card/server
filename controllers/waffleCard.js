import * as waffleCardRepository from '../data/waffleCard.js';
import * as userRepository from '../data/auth.js';

export const getWaffleCards = async (req, res) => {
  const waffleCards = await waffleCardRepository.getAll();
  res.status(200).json(waffleCards);
};

export const getWaffleCardsByUserId = async (req, res) => {};

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
