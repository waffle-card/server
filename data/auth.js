import Mongoose from 'mongoose';
import { useVirtualId } from '../database/database.js';

const userSchema = new Mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
});

useVirtualId(userSchema);

const User = Mongoose.model('User', userSchema);

export async function findByEmail(email) {
  return User.findOne({ email });
}

export async function findById(id) {
  return User.findById(id);
}

export async function createUser(user) {
  return new User(user).save().then(data => data.id);
}
