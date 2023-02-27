import { Request, Response } from 'express';
import { hash } from 'argon2';
import { User } from 'src/app/database/schemas/User';

export const registerUser = async (req: Request, res: Response) => {
  const { fname, lname, email, password } = req.body;

  try {
    const hashedPassword = await hash(password);
    const newUser = await User.create({
      fname: fname,
      lname: lname,
      email: email,
      password: hashedPassword,
      confirmPassword: hashedPassword,
    });
    req.session.user = newUser;
    return res.status(201).json(newUser);
  } catch (e) {
    console.log(e);
  }
};