import multer from 'multer';
import crypto from 'crypto';
import path from 'path';
import ApiError from '../utils/apiError.js';
import fs from 'fs';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'src/config/uploads');
  },
  filename: function (req, file, cb) {
    crypto.randomBytes(16, (err, raw) => {
      if (err) {
        return cb(err);
      }

      const uniqueName = raw.toString('hex');
      cb(null, uniqueName + path.extname(file.originalname));
    });
  },
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'application/pdf'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new ApiError(400, 'Invalid file type'), false);
  }
};




const upload = multer({
  storage: storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});

export default upload;
