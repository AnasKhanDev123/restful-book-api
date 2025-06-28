import Book from '../model/book.model.js';
import ApiError from '../utils/apiError.js';
import apiError from '../utils/apiError.js';
import { deleteFromCloudinary, uploadToCloudinary } from './cloudinary.service.js';
import fs from 'fs';

export const createBookService = async (data, files, user) => {
  let localPdfPath;
  let localFilePath;

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

    const { secure_url: imageUrl, public_id: imagePublicId } = await uploadToCloudinary(
      localFilePath,
      'book-cover',
      'image'
    );
    const { secure_url: pdfUrl, public_id: pdfPublicId } = await uploadToCloudinary(
      localPdfPath,
      'book-pdf',
      'raw'
    );

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
      image: {
        url: imageUrl,
        public_id: imagePublicId,
      },
      pdf: {
        url: pdfUrl,
        public_id: pdfPublicId,
      },
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
  const books = await Book.find().sort({ createdAt: -1 });

  if (books.length === 0) {
    throw new apiError(400, 'no book found');
  }

  return books;
};

export const getBookByIdService = async (id) => { 
  const book = await Book.findById(id);

  if(!book) {
    throw new ApiError(404 , 'no book found')
  }

  return book;

 }

export const deleleBookService = async (id) => {
  // validate mongoose id

  const book = await Book.findById(id);

  if (!book) {
    throw new apiError(404, 'book not found');
  }

  const imageDelete = await deleteFromCloudinary(book.image.public_id, 'image');
  const pdfDelete = await deleteFromCloudinary(book.pdf.public_id, 'raw');

  if (imageDelete.result !== 'ok' || pdfDelete.result !== 'ok') {
    throw new apiError(400, 'failed to delete image or pdf from cloudinary');
  }

  await book.deleteOne();
  return true;
};

export const updateBookService = async (files, id, data) => {
  console.log(files);

  const book = await Book.findById(id);

  if (!book) {
    throw new apiError(404, 'book not found');
  }

  // if files.image[0]
  if (files?.image?.[0]) {
    if (book?.image?.public_id) {
      await deleteFromCloudinary(book.image.public_id, 'image');
    }
    const result = await uploadToCloudinary(files.image[0]?.path, 'book-cover', 'image');

    book.image = {
      url: result.secure_url,
      public_id: result.public_id,
    };
  }

  if (files?.pdf?.[0]) {
    if (book?.pdf?.public_id) {
      await deleteFromCloudinary(book.pdf.public_id, 'raw');
    }

    const result = await uploadToCloudinary(files.pdf[0]?.path, 'book-pdf', 'raw');

    book.pdf = {
      url: result.secure_url,
      public_id: result.public_id,
    };
  }

  // update text fields

  Object.keys(data).forEach((key) => {
    book[key] = data[key];
  });

  await book.save();

  return book;
};
