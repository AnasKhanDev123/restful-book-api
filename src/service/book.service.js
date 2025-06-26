import Book from '../model/book.model.js';
import apiError from '../utils/apiError.js';
import { uploadToCloudinary } from './cloudinary.service.js';
import fs from 'fs';

export const createBookService = async (data, files, user) => {
  let localPdfPath;
  let localFilePath;

  console.log(user);

  try {
    localPdfPath = files?.pdf?.[0]?.path;
    localFilePath = files?.image?.[0]?.path;

    if (!localPdfPath || !localFilePath) {
      throw new apiError(400, 'PDF or image file not found');
    }

    const { title, description, price, genre } = data;

    const existingBook = await Book.findOne({ title });
    if (existingBook) {
      throw new apiError(400, 'this title is already taken , choose another one');
    }

    const { secure_url: imageUrl } = await uploadToCloudinary(localFilePath, 'book-cover', 'image');
    const { secure_url: pdfUrl } = await uploadToCloudinary(localPdfPath, 'book-pdf', 'raw');

    if (!imageUrl || !pdfUrl) {
      throw new apiError(500, 'Failed to upload image or PDF to Cloudinary');
    }

    // Clean up local files
    fs.unlinkSync(localPdfPath);
    fs.unlinkSync(localFilePath);

    const book = await Book.create({
      title,
      description,
      price,
      genre,
      image: imageUrl,
      pdf: pdfUrl,
    });

    book.author = user._id;
    await book.save();

    return book;
  } catch (error) {
    // Safely attempt to clean up files if they exist
    if (localPdfPath && fs.existsSync(localPdfPath)) {
      fs.unlinkSync(localPdfPath);
    }
    if (localFilePath && fs.existsSync(localFilePath)) {
      fs.unlinkSync(localFilePath);
    }

    throw error;
  }
};

export const getBooksService = async () => {
  const books = await Book.find();

  if (books.length === 0) {
    throw new apiError(400, 'no book found');
  }

  return books;
};
