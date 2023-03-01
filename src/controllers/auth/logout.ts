import { Request, Response } from 'express';
import { sanitizeError } from 'util/sanitizers';

export const logOutUser = (req: Request, res: Response) => {
  req.session.destroy((err) => {
    if (err) return res.json(sanitizeError("Can't log off.", 404));
    return res.status(200).json({ success: true });
  });
};
