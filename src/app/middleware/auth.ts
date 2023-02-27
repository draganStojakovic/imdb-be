import { Request, Response, NextFunction } from 'express';

declare module 'express-session' {
  export interface SessionData {
    user: { [key: string]: any };
  }
}

export const auth = (req: Request, res: Response, next: NextFunction) => {
  if (req.session.user) return next();
  res.sendStatus(401);
  return res.json({ error: 'Not authentificated.' });
};
