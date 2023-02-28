import { Request, Response } from 'express';

export const logOutUser = (req: Request, res: Response) => {
  req.session.destroy((err) => {
    if (err)
      return res.json({
        success: false,
        error: err,
      });
    return res.json({ success: true });
  });
};
