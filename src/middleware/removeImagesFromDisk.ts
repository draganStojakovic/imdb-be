import { Request, Response, NextFunction } from 'express';
import { emitter } from 'events/events';
import { PosterAction } from 'types/IMovie';

export default function removeImagesFromDisk(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { thumbnail, fullSize } = req.session.poster;

  const thumbnailFile: PosterAction = {
    action: 'delete',
    filePath: thumbnail,
  };
  const fullSizeFile: PosterAction = {
    action: 'delete',
    filePath: fullSize,
  };

  emitter.emit('fileAction', thumbnailFile);
  emitter.emit('fileAction', fullSizeFile);

  return next();
}
