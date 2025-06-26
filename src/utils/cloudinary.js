import { v2 as cloudinary } from 'cloudinary';
import _config from '../config/_config.js';

cloudinary.config({
  cloud_name: _config.cloudinary.cloud_name,
  api_key: _config.cloudinary.api_key,
  api_secret: _config.cloudinary.api_secret,
});

export default cloudinary;
