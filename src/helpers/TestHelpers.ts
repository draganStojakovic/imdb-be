import { User } from 'database/schemas/User';
import passwordManager from './PasswordManager';

const createUser = async () => {
  try {
    const hashedPassword = await passwordManager.hash('password123');
    const newUser = await User.create({
      fname: 'John',
      lname: 'Doe',
      email: 'johndoe@gmail.com',
      password: hashedPassword,
    });
    return newUser;
  } catch (e) {
    return null;
  }
};

export default createUser;