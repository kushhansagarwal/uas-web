import multer from "multer";
import { GridFsStorage } from "multer-gridfs-storage";
import clientPromise from "./mongodb";

// Create storage engine
export function upload() {
  const storage = new GridFsStorage({
    url: "mongodb+srv://uas:L5gDogEjbNyNIn6e@uas-main.mq8vy.mongodb.net/?retryWrites=true&w=majority&appName=UAS-Main",
    file: (req, file) => {
      return new Promise((resolve, _reject) => {
        const fileInfo = {
          filename: file.originalname,
          bucketName: "filesBucket",
        };
        resolve(fileInfo);
      });
    },
  });

  return multer({ storage });
}
