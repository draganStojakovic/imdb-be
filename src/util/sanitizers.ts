import { IMovie } from 'types/IMovie';
import { iUser } from 'types/iUser';
import { IGenre } from 'types/IGenre';

export const sanitizeUser = (user: iUser) => {
  return {
    id: user._id,
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
      genres: movie.genres,
      likes: movie.likes,
      dislikes: movie.dislikes,
    };
  });
};

export const sanitizeMovie = (movie: IMovie) => {
  return {
    id: movie._id,
    title: movie.title,
    description: movie.description,
    coverImage: movie.coverImage,
    genres: movie.genres,
    likes: movie.likes,
    dislikes: movie.dislikes,
  };
};

export const sanitizeError = (
  msg: string,
  location = 'body',
  value?: string,
  param?: string
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

export const sanitizeGenres = (genres: IGenre[]) => {
  return genres?.map((genre) => {
    return {
      id: genre._id,
      name: genre.name,
    };
  });
};

export const sanitizeGenre = (genre: IGenre) => {
  return {
    id: genre._id,
    name: genre.name,
  };
};
