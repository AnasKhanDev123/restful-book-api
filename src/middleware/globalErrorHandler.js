import ApiError from '../utils/apiError.js';
import logger from '../utils/logger.js';

export const globalErrorHandler = (err, req, res, next) => {
  if (err instanceof ApiError) {
    console.log(err.name);
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
      statusCode: err.statusCode,
      errors: err.errors || [],
      stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
    });
  }

  console.log(err)

  logger.error(
    `${err.statusCode | 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`
  );

  res.status(500).json({
    success: false,
    message: 'Internal Server Error',
    statusCode: 500,
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
  });
};
