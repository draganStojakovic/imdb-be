import { Request, Response, NextFunction } from 'express';
import { publicStorageManager } from 'helpers/PublicStorageManager';
import { emitter } from 'events/events';
import { PosterAction } from 'types/IMovie';
import gm from 'gm';
import path from 'path';

export default function resizeImage(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const imagesRootFolder = publicStorageManager.getImagesPath();
  const imagePath = publicStorageManager.fileFullPath(req.file.filename);

  const imageResizer = gm.subClass({ imageMagick: true });

  const thumbnailImagePath = path.join(
    imagesRootFolder,
    'thumbnails',
    req.file.filename
  );

  const fullsizeImagePath = path.join(
    imagesRootFolder,
    'full-size',
    req.file.filename
  );

  const thumbnailPromise = new Promise<void>((resolve, reject) => {
    imageResizer(imagePath)
      .resize(200)
      .write(thumbnailImagePath, (err) => {
        if (err) {
          reject(err);
        } else {
          console.log(`${thumbnailImagePath} saved successfuly`);
          resolve();
        }
      });
  });

  const fullsizePromise = new Promise<void>((resolve, reject) => {
    imageResizer(imagePath)
      .resize(400)
      .write(fullsizeImagePath, (err) => {
        if (err) {
          reject(err);
        } else {
          console.log(`${fullsizeImagePath} saved successfuly`);
          resolve();
        }
      });
  });
  
  Promise.all([thumbnailPromise, fullsizePromise])
    .then(() => {
      const file: PosterAction = {
        action: 'delete',
        filePath: publicStorageManager.fileFullPath(req.file.filename),
      };
      emitter.emit('fileAction', file);
      req.session.poster = {
        thumbnail: thumbnailImagePath,
        fullSize: fullsizeImagePath,
      };
      next();
    })
    .catch((err) => {
      return console.error('Error while resizing images:', err);
    });
}
