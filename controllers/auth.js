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

export const signup = async (req, res) => {
  const { name, email, password } = req.body;
  const found = await userRepository.findByEmail(email);

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
  res.status(201).json({ token, id: userId, name, email });
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await userRepository.findByEmail(email);

  if (!user) {
    return res.status(401).json({ message: '유효하지 않는 회원정보입니다.' });
  }

  const isValidPassword = await bcrypt.compare(password, user.password);

  if (!isValidPassword) {
    return res.status(401).json({ message: '유효하지 않는 회원정보입니다.' });
  }

  const token = createJwtToken(user.id);
  res
    .status(200)
    .json({ token, id: user.id, name: user.name, email: user.email });
};

export const me = async (req, res) => {
  const user = await userRepository.findById(req.userId);
  if (!user) {
    return res.status(404).json({ message: '존재하지 않는 유저입니다.' });
  }
  res.status(200).json({
    token: req.token,
    id: user.id,
    name: user.name,
    email: user.email,
  });
};

export const updateUser = async (req, res) => {
  const user = await userRepository.findById(req.userId);
  if (!user) {
    return res.status(404).json({ message: '존재하지 않는 유저입니다.' });
  }

  const { name, password } = req.body;
  if (!name && !password) {
    return res.status(400).json({ message: '잘못된 요청입니다.' });
  }

  const hashed = password
    ? await bcrypt.hash(password, config.bcrypt.saltRounds)
    : undefined;

  const updatedUser = await userRepository.updateUser(user.id, {
    name,
    password: hashed,
  });

  const token = createJwtToken(updatedUser.id);

  res.status(200).json({
    token,
    id: updatedUser.id,
    name: updatedUser.name,
    email: updatedUser.email,
  });
};
