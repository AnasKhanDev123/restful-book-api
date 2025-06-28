import { Router } from 'express';
import { createBook, getBooks, deleteBookById, updateBookById } from '../controller/book.controller.js';
import upload from '../config/multer.config.js';
import { auth } from '../middleware/auth.middleware.js';
import { validateFileUpload } from '../middleware/validateFileUpload.js';
import validate from '../middleware/validate.middleware.js';
import { createBookValidator } from '../validators/books.js';

const router = Router();

router
  .route('/')
  .post(
    auth,
    upload.fields([
      { name: 'image', maxCount: 1 },
      { name: 'pdf', maxCount: 1 },
    ]),
    createBookValidator(),
    validate,
    validateFileUpload,
    createBook
  )
  .get(auth, getBooks);

router
  .route('/:bookId')
  .delete(auth, deleteBookById)
  .patch(
    auth,
    upload.fields([
      { name: 'image', maxCount: 1 },
      { name: 'pdf', maxCount: 1 },
    ]),
    // validateFileUpload,
    updateBookById
  );

export default router;
