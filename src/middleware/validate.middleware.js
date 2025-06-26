import { validationResult } from 'express-validator';
import ApiError from '../utils/apiError.js';

const validate = async (req, res, next) => {
  const errors = validationResult(req);

  const extractedErrors = [];
  if (errors.isEmpty()) return next();

  errors.array().map((err) => {
    extractedErrors.push({
      [err.path]: err.msg,
    });
  });

  res.status(422).json(new ApiError(422, 'Recieved data is not valid', extractedErrors));
};

export default validate;
