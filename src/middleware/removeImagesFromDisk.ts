import { Request, Response, NextFunction } from 'express';
import { emitter } from 'events/events';
import { PosterAction } from 'types/IMovie';
import { publicStorageManager } from 'helpers/PublicStorageManager';
import path from 'path';

export default function removeImagesFromDisk(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { thumbnail, fullSize } = req.session.poster;

  const thumbArr = thumbnail.split('/');
  const fullSizeArr = fullSize.split('/');

  const thumbnailFile: PosterAction = {
    action: 'delete',
    filePath: path.join(
      publicStorageManager.getImagesPath(),
      'thumbnails',
      thumbArr[thumbArr.length - 1]
    ),
  };
  const fullSizeFile: PosterAction = {
    action: 'delete',
    filePath: path.join(
      publicStorageManager.getImagesPath(),
      'full-size',
      fullSizeArr[fullSizeArr.length - 1]
    ),
  };

  emitter.emit('fileAction', thumbnailFile);
  emitter.emit('fileAction', fullSizeFile);

  return next();
}
