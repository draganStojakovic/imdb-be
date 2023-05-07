import { User } from 'database/schemas/User';
import { Movie } from 'database/schemas/Movie';
import { Genre } from 'database/schemas/Genre';
import { Poster } from 'database/schemas/Poster';
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
    const poster = await addMoviePostertoDb();
    const newMovie = await Movie.create({
      title: 'test movie',
      description: 'description of a movie',
      coverImage: poster._id,
      genres: [genres[0]._id, genres[2]._id],
    });
    return newMovie;
  } catch (e) {
    return null;
  }
};

export const createGenresTest = async () => {
  try {
    return await Genre.insertMany([
      {
        name: 'action',
      },
      {
        name: 'horror',
      },
      {
        name: 'comedy',
      },
      {
        name: 'animation',
      },
    ]);
  } catch (e) {
    return null;
  }
};

export const addMoviePostertoDb = async () => {
  try {
    return await Poster.create({
      thumbnail: '/images/fake-thumbnail.jpg',
      fullSize: '/images/fake-full-size.jpg',
    });
  } catch (e) {
    return null;
  }
};
