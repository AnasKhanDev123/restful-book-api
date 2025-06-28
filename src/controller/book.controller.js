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

export const getBookById = asyncHandler(async (req, res) => {
  const book = await bookService.getBookById(req.params.bookId);

  return res.status(200).json(new ApiResponse(200, { book }, 'book found'));
});

export const deleteBookById = asyncHandler(async (req, res) => {
  const book = await bookService.deleleBookService(req.params.bookId);

  return res.status(200).json(new ApiResponse(200, { book }, 'Book deleted successfully'));
});

export const updateBookById = asyncHandler(async (req, res) => {
  const { bookId } = req.params;
  const book = await bookService.updateBookService(req.files, bookId, req.body);

  return res.status(200).json(new ApiResponse(200, { book }, 'Book updated successfully'));
});
