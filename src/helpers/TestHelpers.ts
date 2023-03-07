import { User } from 'database/schemas/User';
import { Movie } from 'database/schemas/Movie';
import { Genre } from 'database/schemas/Genre';
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

export const createMovieTest = async () => {
  try {
    const genres = await createGenresTest();
    const newMovie = await Movie.create({
      title: 'test movie',
      description: 'description of a movie',
      coverImage: 'https://blabla.com/images/blabla.jpg',
      genre: [genres[0]._id, genres[2]._id],
    });
    return newMovie;
  } catch (e) {
    return null;
  }
};

export const createGenresTest = async () => {
  try {
    const action = await Genre.create({
      name: 'action',
    });
    const horror = await Genre.create({
      name: 'horror',
    });
    const comedy = await Genre.create({
      name: 'comedy',
    });
    return [action, horror, comedy];
  } catch (e) {
    return null;
  }
};
