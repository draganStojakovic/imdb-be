import { Request, Response } from 'express';
import { User } from 'database/schemas/User';
import { sanitizeError, sanitizeUser } from 'util/sanitizers';
import passwordManager from 'helpers/PasswordManager';

export const registerUser = async (req: Request, res: Response) => {
  const { fname, lname, email, password } = req.body;

  try {
    const hashedPassword = await passwordManager.hash(password);
    const newUser = await User.create({
      fname: fname,
      lname: lname,
      email: email,
      password: hashedPassword,
    });
    req.session.user = newUser;
    return res.status(201).json(sanitizeUser(newUser));
  } catch (e) {
    console.log(e);
    return res.status(500).json(sanitizeError('Server Error', 500));
  }
};
