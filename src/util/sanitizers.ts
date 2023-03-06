import { IMovie } from 'types/IMovie';
import { iUser } from 'types/iUser';

export const sanitizeUser = (user: iUser) => {
  return {
    fname: user.fname,
    lname: user.lname,
    email: user.email,
  };
};

export const sanitizeMovies = (movies: IMovie[]) => {
  return movies.map((movie) => {
    return {
      id: movie._id,
      title: movie.title,
      description: movie.description,
      coverImage: movie.coverImage,
      genre: movie.genre,
    };
  });
};

export const sanitizeMovie = (movie: IMovie) => {
  return {
    id: movie._id,
    title: movie.title,
    description: movie.description,
    coverImage: movie.coverImage,
    genre: movie.genre,
  };
};

export const sanitizeError = (
  msg: string,
  location = 'body',
  value?: string,
  param?: string,
) => {
  return {
    success: false,
    errors: [
      {
        msg,
        location,
        value,
        param,
      },
    ],
  };
};
