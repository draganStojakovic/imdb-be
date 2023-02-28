import { Request, Response, NextFunction } from 'express';

export const guest = (req: Request, res: Response, next: NextFunction) => {
  if (!req.session.user) return next();
  return res.status(403).json({ error: 'Already authentificated.' });
};
