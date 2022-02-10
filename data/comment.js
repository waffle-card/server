import Mongoose from 'mongoose';
import { useVirtualId } from '../database/database.js';

const commentSchema = new Mongoose.Schema(
  {
    user: { type: Mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
    waffleCardId: { type: String, required: true },
    text: { type: String, required: true },
  },
  { timestamps: true, versionKey: false }
);

useVirtualId(commentSchema);

const Comment = Mongoose.model('comment', commentSchema);

export const getAllByWaffleCardId = async waffleCardId => {
  return Comment.find({ waffleCardId })
    .populate({ path: 'user', select: 'name' })
    .sort({ updatedAt: -1 });
};

export const getById = async id => {
  return Comment.findById(id).populate({ path: 'user', select: 'name' });
};

export const getByUserId = async userId => {
  return Comment.findOne({ userId }).populate({ path: 'user', select: 'name' });
};

export const create = async (userId, waffleCardId, text) => {
  return new Comment({
    user: userId,
    waffleCardId,
    text,
  }).save();
};

export const update = async (id, text) => {
  return Comment.findByIdAndUpdate(id, { text }, { returnOriginal: false });
};

export const remove = async id => {
  return Comment.findByIdAndDelete(id);
};
