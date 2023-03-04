import { User } from 'database/schemas/User';
import { Movie } from 'database/schemas/Movie';
import passwordManager from './PasswordManager';

export const createUser = async () => {
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

export const createMovieJest = async () => {
  try {
    const newMovie = await Movie.create({
      title: 'test movie',
      description: 'description of a movie',
      coverImage: 'https://blabla.com/images/blabla.jpg',
      genre: 'horror',
    });
    return newMovie;
  } catch (e) {
    return null;
  }
};
