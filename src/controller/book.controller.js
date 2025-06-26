import * as bookService from '../service/book.service.js';
import ApiResponse from '../utils/api-response.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const createBook = asyncHandler(async (req, res) => {
  const book = await bookService.createBookService(req.body, req.files, req.user);

  return res.status(201).json(new ApiResponse(201, { book }, 'Book created successfully'));
});

export const getBooks = asyncHandler(async (req, res) => {
  const books = await bookService.getBooksService();

  return res.status(200).json(new ApiResponse(200, { books }, 'Book founded successfully'));
});
