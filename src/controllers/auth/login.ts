import { Request, Response } from 'express';
import { User } from 'database/schemas/User';
import bcryptjs from 'bcryptjs';
import { sanitizeError, sanitizeUser } from 'util/sanitizers';
import { compareTextHelper } from 'helpers/hashTextHelper';

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email: email });

    if (!user) {
      return res.status(401).json(sanitizeError('Bad credentials.', 401));
    }

    const response = await compareTextHelper(bcryptjs, password, user.password);

    if (!response) {
      return res.status(401).json(sanitizeError('Bad credentials.', 401));
    }

    req.session.user = user;
    return res.status(200).json(sanitizeUser(user));
  } catch (e) {
    console.log(e);
    return res.json(res);
  }
};
