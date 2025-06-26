import { Schema, model } from 'mongoose';

const bookSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  description: {
    type: String,
  },
  image: {
    type: String,
  },
  price: {
    type: String,
  },
  genre: {
    type: String,
  },
  pdf: {
    type: String,
  },
});

export default model('Book', bookSchema);
