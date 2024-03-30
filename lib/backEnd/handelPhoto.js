import sharp from "sharp";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const uploadPhoto = async (file) => {
  if (!file) {
    return false;
  }

  try {
    const bufferData = await file.arrayBuffer();

    const image = sharp(bufferData);

    const resizedImage = await image
      .resize({ width: 1600, height: null })
      .toBuffer();
    const img = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream((error, uploadResult) => {
          if (error) {
            return reject(new Error("Failed to upload image to Cloudinary"));
          } else {
            return resolve(uploadResult);
          }
        })
        .end(resizedImage);
    });

    return img?.public_id !== null ? `${img.public_id}.${img.format}` : false;
  } catch (error) {
    return false;
  }
};

const deletePhoto = async (image) => {
  const id = image.split(".");
  let err = true;
  try {
    const img = await cloudinary.uploader.destroy(id[0], (error, result) => {
      if (error) {
        // in error
        err = true;
      } else {
        // in success
        err = false;
      }
    });
    return err;
  } catch (error) {
    return err;
  }
};

module.exports = {
  uploadPhoto,
  deletePhoto,
};
