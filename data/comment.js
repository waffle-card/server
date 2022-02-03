import Mongoose from 'mongoose';
import { useVirtualId } from '../database/database.js';
import * as userRepository from './auth.js';

const commentSchema = new Mongoose.Schema(
  {
    userId: { type: String, required: true },
    userName: { type: String, required: true },
    waffleCardId: { type: String, required: true },
    text: { type: String, required: true },
  },
  { timestamps: true, versionKey: false }
);

useVirtualId(commentSchema);

const Comment = Mongoose.model('comment', commentSchema);

export const getAllByWaffleCardId = async waffleCardId => {
  return Comment.find({ waffleCardId }).sort({ updatedAt: -1 });
};

export const getById = async id => {
  return Comment.findById(id);
};

export const getByUserId = async userId => {
  return Comment.findOne({ userId });
};

export const create = async (userId, waffleCardId, text) => {
  return userRepository.findById(userId).then(user =>
    new Comment({
      userId: user.id,
      userName: user.name,
      waffleCardId,
      text,
    }).save()
  );
};

export const update = async (id, text) => {
  return Comment.findByIdAndUpdate(id, { text }, { returnOriginal: false });
};

export const remove = async id => {
  return Comment.findByIdAndDelete(id);
};
