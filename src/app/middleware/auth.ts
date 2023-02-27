import { Request, Response, NextFunction } from 'express';

declare module 'express-session' {
  export interface SessionData {
    user: { [key: string]: any };
  }
}

export const auth = (req: Request, res: Response, next: NextFunction) => {
  if (req.session.user) return next();
  return res.status(401).json({ error: 'Not authentificated.' });
};
