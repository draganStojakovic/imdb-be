import { uploadMoviePoster } from 'controllers/uploads/uploadMoviePoster';
import { Router } from 'express';
import { auth } from 'middleware/auth';
import resizeImage from 'middleware/resizeImage';
import isImage from 'middleware/isImage';
import upload from 'uploader/multer';

export const uploadRouter = Router();

uploadRouter.post(
  '/upload',
  auth,
  upload.single('poster'),
  isImage,
  resizeImage,
  uploadMoviePoster
);
