import ApiError from '../utils/apiError.js';
import cloudinary from '../utils/cloudinary.js';

export const uploadToCloudinary = async (localFilePath, folder, resourceType='auto') => {
  if (!localFilePath) return null;
  


  const result = await cloudinary.uploader.upload(localFilePath, {
    resource_type: resourceType,
    folder,
  });

  if (!result.secure_url) {
    throw new ApiError(400, 'failed to upload image to cloudinary');
  }

  return {
    secure_url: result.secure_url,
  };
};
