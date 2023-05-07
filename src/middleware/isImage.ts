import { Request, Response, NextFunction } from 'express';
import { sanitizeError } from 'util/sanitizers';
import { emitter } from 'events/events';
import { publicStorageManager } from 'helpers/PublicStorageManager';
import { PosterAction } from 'types/IMovie';

export default function isImage(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (req.file.mimetype.startsWith('image/')) return next();

  const file: PosterAction = {
    action: 'delete',
    filePath: publicStorageManager.fileFullPath(req.file.filename),
  };

  emitter.emit('fileAction', file);

  return res
    .status(422)
    .json(sanitizeError('Images only', 'body', '422', 'poster'));
}
