import fs from "fs/promises";
import path from "path";

export const deleteUploadedFile = async (file) => {
  if (!file) return;

  let fullPath = null;

  try {
    // CASE 1: If file is Multer File object
    if (typeof file !== "string") {
      fullPath = path.resolve(file.path);
    }

    // CASE 2: If file is URL string stored in DB
    else {
      const fileName = file.split("/uploads/")[1];
      if (!fileName) return;
      fullPath = path.resolve(`uploads/${fileName}`);
    }

    // Delete file if exists
    await fs.unlink(fullPath);
    console.log("Deleted file:", fullPath);

  } catch (error) {
    if (error.code !== "ENOENT") {
      console.error(`Error deleting file ${fullPath}:`, error);
    } else {
      console.warn(`File not found (already deleted?): ${fullPath}`);
    }
  }
};