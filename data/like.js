import Mongoose from 'mongoose';
import { useVirtualId } from '../database/database.js';
import * as userRepository from './auth.js';

const likeSchema = new Mongoose.Schema(
  {
    userId: { type: String, required: true },
    waffleCardId: { type: String, required: true },
  },
  { versionKey: false }
);

useVirtualId(likeSchema);

const Like = new Mongoose.model('like', likeSchema);

export const getByUserId = async userId => {
  return Like.findOne({ userId });
};

export const getAllByUserId = async userId => {
  return Like.find({ userId });
};

export const getByUserIdAndWaffleCardId = async (userId, waffleCardId) => {
  return Like.findOne({ userId, waffleCardId });
};

export const getAllByWaffleCardId = async waffleCardId => {
  return Like.find({ waffleCardId });
};

export const create = async (userId, waffleCardId) => {
  return new Like({ userId, waffleCardId }).save();
};

export const remove = async id => {
  return Like.findByIdAndDelete(id);
};

export const removeAllByWaffleCardId = async waffleCardId => {
  return Like.deleteMany({ waffleCardId });
};
