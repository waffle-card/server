import Mongoose from 'mongoose';
import { useVirtualId } from '../database/database.js';

const userSchema = new Mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
  },
  { versionKey: false }
);

useVirtualId(userSchema);

const User = Mongoose.model('user', userSchema);

export const findByEmail = async email => {
  return User.findOne({ email });
};

export const findById = async id => {
  return User.findById(id);
};

export const createUser = async user => {
  return new User(user).save().then(data => data.id);
};

export const updateUser = async (id, user) => {
  const { name, password } = user;

  return User.findByIdAndUpdate(
    id,
    { name, password },
    { returnOriginal: false }
  );
};
