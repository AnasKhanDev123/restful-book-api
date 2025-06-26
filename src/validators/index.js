import { body, oneOf } from 'express-validator';

export const registerUser = () => {
  return [
    body('username')
      .notEmpty()
      .withMessage('username is required')
      .isLength({ min: 8 })
      .withMessage('username must be at least 8 characters long')
      .isLength({ max: 20 })
      .withMessage('username will be at most 20 characters')
      .whitelist('a-zA-Z0-9')
      .withMessage('username will only contains (a-z , A-Z, 0-9)'),

    body('email')
      .notEmpty()
      .withMessage('email is required')
      .isEmail()
      .withMessage('invalid email address'),

    body('password')
      .notEmpty()
      .withMessage('password is required')
      .isLength({ min: 8 })
      .withMessage('password must be at least 8 characters long')
      .isLength({ max: 20 })
      .withMessage('password will be at most 20 characters')
      .whitelist('a-zA-Z0-9')
      .withMessage('password will only contains (a-z , A-Z, 0-9)'),
  ];
};

export const loginUserValidator = () => {
  return [
    body('email')
      .notEmpty()
      .withMessage('email is required')
      .isEmail()
      .withMessage('invalid email address'),
    body('password')
      .notEmpty()
      .withMessage('password is required')
      .blacklist('!#$%^&*()_+-=[]{};:,.<>/?'),
  ];
};
