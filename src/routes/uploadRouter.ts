import { Router } from 'express';
import { auth } from 'middleware/auth';
import resizeImage from 'middleware/resizeImage';
import isImage from 'middleware/isImage';
import upload from 'uploader/multer';
import { insertLinksOfUploadedImages } from 'controllers/uploads/insertLinksOfUploadedImages';
import posterIdValidator from 'validators/posterIdValidator';
import removeImagesFromDisk from 'middleware/removeImagesFromDisk';
import { removeLinksOfUploadedImages } from 'controllers/uploads/removeLinksOfUploadedImages';

export const uploadRouter = Router();

uploadRouter.post(
  '/upload',
  auth,
  upload.single('poster'),
  isImage,
  resizeImage,
  insertLinksOfUploadedImages
);

uploadRouter.delete(
  '/upload',
  auth,
  posterIdValidator,
  removeImagesFromDisk,
  removeLinksOfUploadedImages
);
