import { Request, Response } from 'express';
import { User } from 'database/schemas/User';
import bcryptjs from 'bcryptjs';

export const registerUser = async (req: Request, res: Response) => {
  const { fname, lname, email, password } = req.body;

  try {
    const hashedPassword = await bcryptjs.hash(password, 10);
    const newUser = await User.create({
      fname: fname,
      lname: lname,
      email: email,
      password: hashedPassword,
    });
    req.session.user = newUser;
    return res.status(201).json(newUser);
  } catch (e) {
    console.log(e);
    return res.status(500).json({ error: 'Status 500' });
  }
};
