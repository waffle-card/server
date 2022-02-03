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

export const getByWaffleCardId = async waffleCardId => {
  return Like.findOne({ userId });
};

export const create = async (userId, waffleCardId) => {
  return new Like({ userId, waffleCardId }).save();
};

export const remove = async (userId, waffleCardId) => {
  return Like.findOneAndDelete({ userId, waffleCardId });
};
