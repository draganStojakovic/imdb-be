import { IMovie, IMovieStrippedDown } from 'types/IMovie';
import { IGenre } from 'types/IGenre';
import { IComment } from 'types/IComment';
import { IUser } from 'types/IUser';

export const sanitizeUser = (user: IUser) => {
  return {
    id: user._id,
    fname: user.fname,
    lname: user.lname,
    email: user.email,
    watchedMovies: user.watchedMovies,
    watchList: user.watchList,
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
      views: movie.views,
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
    views: movie.views,
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

export const sanitizeComment = (comment: IComment) => {
  return {
    id: comment._id,
    content: comment.content,
    userId: comment.userId,
  };
};

export const sanitizeStrippedDownMovies = (movies: IMovieStrippedDown[]) => {
  return movies.map((movie) => {
    return {
      id: movie._id,
      coverImage: movie.coverImage,
    };
  });
};
