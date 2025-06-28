import { Schema, model } from 'mongoose';

const bookSchema = new Schema(
  {
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
    price: {
      type: String,
    },
    genre: {
      type: String,
      enum: ['fiction', 'non-fiction'],
    },
    image: {
      url: String,
      public_id: String,
    },
    pdf: {
      url: String,
      public_id: String,
    },
  },
  { timestamps: true }
);

export default model('Book', bookSchema);
