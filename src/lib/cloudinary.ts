import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function uploadToCloudinary(file: any): Promise<string> {
  try {
    // Convert buffer to base64
    const fileStr = `data:${file.mimetype};base64,${file.buffer.toString('base64')}`;
    
    // Upload to Cloudinary
    const uploadResponse = await cloudinary.uploader.upload(fileStr, {
      folder: 'taxurge-documents',
      resource_type: 'auto',
    });
    
    return uploadResponse.secure_url;
  } catch (error) {
    console.error('Error uploading to Cloudinary:', error);
    throw new Error('Failed to upload file to Cloudinary');
  }
}

export default cloudinary;