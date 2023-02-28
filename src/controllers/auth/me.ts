import { Request, Response } from 'express';
import { sanitizeUser } from 'util/sanitizers';

export const me = (req: Request, res: Response) => {
  return res.status(200).json(sanitizeUser(req.session.user));
};
