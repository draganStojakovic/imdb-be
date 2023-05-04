import { Router } from 'express';
import { auth } from 'middleware/auth';
import resizeImage from 'middleware/resizeImage';
import isImage from 'middleware/isImage';
import upload from 'uploader/multer';
import { insertLinksOfUploadedImages } from 'controllers/uploads/insertLinksOfUploadedImages';

export const uploadRouter = Router();

uploadRouter.post(
  '/upload',
  auth,
  upload.single('poster'),
  isImage,
  resizeImage,
  insertLinksOfUploadedImages
);
