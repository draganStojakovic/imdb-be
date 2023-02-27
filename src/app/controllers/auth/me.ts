import { Request, Response } from 'express';

export const me = (req: Request, res: Response) => {
  return res.status(200).json(req.session.user);
};
