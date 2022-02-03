import * as commentRepository from '../data/comment.js';
import * as waffleCardRepository from '../data/waffleCard.js';
import { isValidId } from './utils.js';

export const getCommentsByWaffleCardId = async (req, res) => {
  const waffleCardId = req.query['waffle-card-id'];
  if (!waffleCardId) {
    return res.status(404).json({ message: '와플카드 id가 필요합니다.' });
  }

  console.log(waffleCardId);
  const comments = await commentRepository.getAllByWaffleCardId(waffleCardId);
  res.status(200).json(comments);
};

export const createComment = async (req, res) => {
  const { waffleCardId, text } = req.body;

  if (!isValidId(waffleCardId)) {
    return res
      .status(404)
      .json({ message: '와플카드 id가 유효하지 않습니다.' });
  }

  const waffleCard = await waffleCardRepository.getById(waffleCardId);

  if (!waffleCard) {
    return res.status(404).json({ message: '와플카드가 존재하지 않습니다.' });
  }

  const comment = await commentRepository.create(
    req.userId,
    waffleCardId,
    text
  );

  res.status(200).json(comment);
};

export const updateComment = async (req, res) => {
  const id = req.params.id;
  const text = req.body.text;

  if (!isValidId(id)) {
    return res
      .status(404)
      .json({ message: '와플카드 id가 유효하지 않습니다.' });
  }
  const comment = await commentRepository.getById(id);

  if (!comment) {
    return res.status(404).json({ message: '댓글이 존재하지 않습니다.' });
  }

  if (comment.userId !== req.userId) {
    return res.status(403).json({ message: '삭제 권한이 없습니다.' });
  }

  const updatedComment = await commentRepository.update(id, text);
  res.status(200).json(updatedComment);
};

export const deleteComment = async (req, res) => {
  const id = req.params.id;

  if (!isValidId(id)) {
    return res
      .status(404)
      .json({ message: '와플카드 id가 유효하지 않습니다.' });
  }

  const comment = await commentRepository.getById(id);

  if (!comment) {
    return res.status(404).json({ message: '댓글이 존재하지 않습니다.' });
  }

  if (comment.userId !== req.userId) {
    return res.status(403).json({ message: '삭제 권한이 없습니다.' });
  }

  await commentRepository.remove(id);
  res.sendStatus(204);
};
