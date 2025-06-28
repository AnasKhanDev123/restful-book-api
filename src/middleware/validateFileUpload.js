import  apiError  from '../utils/apiError.js';

export const validateFileUpload = (req, res, next) => {
  const errors = [];

  if (!req.files?.image || req.files.image.length === 0) {
    errors.push({ msg: 'Image file is required' });
  }

  if (!req.files?.pdf || req.files.pdf.length === 0) {
    errors.push({ msg: 'PDF file is required' });
  }

  if (errors.length > 0) {
    return res.status(400).json(new apiError(400, 'Invalid file upload', errors));
  }

  next();
};
