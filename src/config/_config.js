import { config as conf } from 'dotenv';

conf();

const _config = {
  port: process.env.PORT || 4000,
  mongoUri: process.env.MONGO_URI,
  cloudinary: {
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  },
};

export default Object.freeze(_config);
