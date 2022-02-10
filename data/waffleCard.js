import Mongoose from 'mongoose';
import { useVirtualId } from '../database/database.js';

const waffleCardSchema = new Mongoose.Schema(
  {
    user: { type: Mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
    emoji: { type: String, required: true },
    color: { type: String, required: true },
    hashTags: { type: [String], required: true },
  },
  { timestamps: true, versionKey: false }
);

useVirtualId(waffleCardSchema);

const WaffleCard = Mongoose.model('waffleCard', waffleCardSchema);

export const getAll = async () => {
  return WaffleCard.find()
    .populate({ path: 'user', select: 'name' })
    .sort({ updatedAt: -1 });
};

export const getById = async id => {
  return WaffleCard.findById(id).populate({ path: 'user', select: 'name' });
};

export const getAllByIds = async ids => {
  return WaffleCard.find({ _id: { $in: ids } })
    .populate({ path: 'user', select: 'name' })
    .sort({ updatedAt: -1 });
};

export const getAllByUserId = async userId => {
  return WaffleCard.find({ userId })
    .populate({ path: 'user', select: 'name' })
    .sort({ updatedAt: -1 });
};

export const create = async (userId, waffleCardInfo) => {
  const { emoji, color, hashTags } = waffleCardInfo;

  return new WaffleCard({
    user: userId,
    emoji,
    color,
    hashTags,
    likeCount: 0,
  }).save();
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
