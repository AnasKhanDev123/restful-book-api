import { body } from 'express-validator';

export const createBookValidator = () => {
  return [
    body('title')
      .notEmpty()
      .withMessage('Title is required')
      .isLength({ min: 6 })
      .withMessage('Title must be at least 6 characters long')
      .isLength({ max: 50 })
      .withMessage('Title will be at most 50 characters')
      .matches(/^[a-zA-Z0-9, ]+$/)
      .withMessage('Title can only contain letters, numbers, commas ,and spaces'),
    body('description')
      .notEmpty()
      .withMessage('Description is required')
      .isLength({ min: 10 })
      .withMessage('Description must be at least 10 characters long')
      .isLength({ max: 600 })
      .withMessage('Description will be at most 200 characters'),
    body('price')
      .notEmpty()
      .withMessage('Price is required')
      .isNumeric()
      .withMessage('Price must be a number'),
    body('genre')
      .notEmpty()
      .withMessage('Genre is required')
      .isIn(['fiction', 'non-fiction'])
      .withMessage('Genre must be either fiction or non-fiction'),
  ];
};
