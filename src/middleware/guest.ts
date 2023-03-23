import { Request, Response, NextFunction } from 'express';
import { sanitizeError } from 'util/sanitizers';

export const guest = (req: Request, res: Response, next: NextFunction) => {
  if (!req.session.user) return next();
  return res
    .status(403)
    .json(sanitizeError('Already authentificated', 'body', '403'));
};
