import { body, validationResult } from 'express-validator';

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  return res.status(400).json({ message: errors.array()[0].msg });
};

export const validateSignup = [
  body('name').trim().notEmpty().withMessage('유저의 이름은 필수입니다.'),
  body('name')
    .trim()
    .isLength({ min: 2, max: 12 })
    .withMessage('유저의 이름은 2글자에서 12글자까지만 가능합니다.'),
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('유효하지 않은 이메일입니다.'),
  body('password').notEmpty().withMessage('비밀번호는 필수입니다.'),
  body('password')
    .isLength({ min: 6, max: 15 })
    .withMessage('비밀번호는 6글자에서 15글자까지만 가능합니다.'),
  validate,
];

export const validateLogin = [
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('유효하지 않은 이메일입니다.'),
  body('password').notEmpty().withMessage('비밀번호는 필수입니다.'),
  body('password')
    .isLength({ min: 6, max: 15 })
    .withMessage('비밀번호는 6글자에서 15글자까지만 가능합니다.'),
  validate,
];
