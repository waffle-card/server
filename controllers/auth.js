import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import 'express-async-errors';
import * as userRepository from '../data/auth.js';
import { config } from '../config.js';

function createJwtToken(id) {
  return jwt.sign({ id }, config.jwt.secretKey, {
    expiresIn: config.jwt.expiresInSec,
  });
}

export async function signup(req, res) {
  const { name, email, password } = req.body;
  const found = await userRepository.findByEmail(name);

  if (found) {
    return res
      .status(409)
      .json({ message: `${email} email is already exists` });
  }

  const hashed = await bcrypt.hash(password, config.bcrypt.saltRounds);
  const userId = await userRepository.createUser({
    name,
    password: hashed,
    email,
  });

  const token = createJwtToken(userId);
  res.status(201).json({ token, userId, name });
}
