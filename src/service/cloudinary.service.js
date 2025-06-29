import ApiError from '../utils/apiError.js';
import cloudinary from '../utils/cloudinary.js';

export const uploadToCloudinary = async (localFilePath, folder, resourceType = 'auto') => {
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
    public_id: result.public_id,
  };
};

export const deleteFromCloudinary = async (publicId , resourceType) => {
  if (!publicId) return null;
  

 const result = await cloudinary.uploader.destroy(publicId , {
  resource_type: resourceType
 });

 if (result.result !== 'ok') {
  throw new ApiError(400, 'failed to delete image or pdf from cloudinary');
 }
 console.log(result);


 
};
