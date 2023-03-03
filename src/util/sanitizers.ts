import { IMovie } from 'types/IMovie';
import { iUser } from 'types/iUser';

export const sanitizeUser = (user: iUser) => {
  return {
    fname: user.fname,
    lname: user.lname,
    email: user.email,
  };
};

export const sanitizeMovie = (movie: IMovie) => {
  return {
    title: movie.title,
    description: movie.description,
    coverImage: movie.coverImage,
    genre: movie.genre,
  };
};

export const sanitizeError = (
  message: string,
  status: number,
  location = 'body'
) => {
  return {
    success: false,
    errors: [
      {
        message,
        status,
        location,
      },
    ],
  };
};
