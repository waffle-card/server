import Mongoose from 'mongoose';
import { useVirtualId } from '../database/database.js';
import * as userRepository from './auth.js';

const waffleCardSchema = new Mongoose.Schema(
  {
    userId: { type: String, required: true },
    userName: { type: String, required: true },
    emoji: { type: String, required: true },
    color: { type: String, required: true },
    hashTags: { type: [String], required: true },
  },
  { timestamps: true, versionKey: false }
);

useVirtualId(waffleCardSchema);

const WaffleCard = Mongoose.model('waffleCard', waffleCardSchema);

export const getAll = async () => {
  return WaffleCard.find().sort({ updatedAt: -1 });
};

export const getById = async id => {
  return WaffleCard.findById(id);
};

export const getAllByIds = async ids => {
  return WaffleCard.find({ _id: { $in: ids } }).sort({ updatedAt: -1 });
};

export const getAllByUserId = async userId => {
  return WaffleCard.find({ userId }).sort({ updatedAt: -1 });
};

export const create = async (userId, waffleCardInfo) => {
  const { emoji, color, hashTags } = waffleCardInfo;

  return userRepository.findById(userId).then(user =>
    new WaffleCard({
      userId: user.id,
      userName: user.name,
      emoji,
      color,
      hashTags,
      likeCount: 0,
    }).save()
  );
};

export const update = async (id, waffleCardInfo) => {
  const { emoji, color, hashTags } = waffleCardInfo;

  return WaffleCard.findByIdAndUpdate(
    id,
    { emoji, color, hashTags },
    { returnOriginal: false }
  );
};

export const remove = async id => {
  return WaffleCard.findByIdAndDelete(id);
};
