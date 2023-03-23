import { Request, Response, NextFunction } from 'express';
import { sanitizeError } from 'util/sanitizers';

export const auth = (req: Request, res: Response, next: NextFunction) => {
  if (req.session.user) return next();
  return res
    .status(401)
    .json(sanitizeError('Not authentificated.', 'body', '401'));
};
