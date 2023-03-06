import { Request, Response } from 'express';
import { User } from 'database/schemas/User';
import { sanitizeError, sanitizeUser } from 'util/sanitizers';
import passwordManager from 'helpers/PasswordManager';

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email: email });

    if (!user) {
      return res.status(401).json(sanitizeError('Bad credentials.'));
    }

    const response = await passwordManager.compare(password, user.password);

    if (!response) {
      return res.status(401).json(sanitizeError('Bad credentials.'));
    }

    req.session.user = user;
    return res.status(200).json(sanitizeUser(user));
  } catch (e) {
    console.log(e);
    return res.json(res);
  }
};
