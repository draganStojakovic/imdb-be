import { Request, Response, NextFunction } from 'express';

declare module 'express-session' {
  export interface SessionData {
    user: { [key: string]: any };
  }
}

export const guest = (req: Request, res: Response, next: NextFunction) => {
  if (!req.session.user) next();
  return res.json({ error: 'Already authentificated.' });
};
