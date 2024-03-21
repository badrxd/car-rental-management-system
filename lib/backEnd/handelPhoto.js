import path from "path";
import sharp from "sharp";
import fs from "fs";

const uploadPhoto = async (file, patch = "") => {
  if (!file) {
    return false;
  }

  try {
    const bufferData = await file.arrayBuffer();

    const image = sharp(bufferData);

    const resizedImage = await image
      .resize({ width: 1600, height: null })
      .toBuffer();

    // // Generate a unique filename
    const uniqueFileName = `${Date.now()}_${Math.random()
      .toString(36)
      .substr(2, 9)}.png`;
    // const filePath = path.join(
    //   process.cwd(),
    //   "public",
    //   "images",
    //   uniqueFileName
    // );

    // // Write the resized image buffer to the file
    // fs.writeFileSync(filePath, resizedImage);
    const directoryPath = path.join("public", "images");

    // Ensure the directory exists, if not create it
    if (!fs.existsSync(directoryPath)) {
      fs.mkdirSync(directoryPath, { recursive: true });
    }

    // Define the file path
    const filePath = path.join(directoryPath, uniqueFileName);

    // Write the resized image buffer to the file
    fs.writeFileSync(filePath, resizedImage);

    return uniqueFileName;
  } catch (error) {
    console.log(error.message);
    if (patch === "patch") {
      return { error: true, message: error.message };
    }
    return false;
  }
};

const deletePhoto = async (image) => {
  const filePath = `public/images/${image}`;

  fs.unlink(filePath, (error) => {
    if (error) {
      return false;
    }
    return true;
  });
};

module.exports = {
  uploadPhoto,
  deletePhoto,
};
