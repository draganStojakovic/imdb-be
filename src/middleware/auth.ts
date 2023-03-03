import { Request, Response, NextFunction } from 'express';

export const auth = (req: Request, res: Response, next: NextFunction) => {
  if (req.session.user) return next();
  return res.status(401).json({ error: 'Not authentificated.' });
};
