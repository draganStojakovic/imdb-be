import { createMovie } from 'controllers/movies/createMovie';
import { deleteMovie } from 'controllers/movies/deleteMovie';
import { getMoviesPaginated } from 'controllers/movies/getMoviesPaginated';
import { getSingleMovie } from 'controllers/movies/getSingleMovie';
import { moviesEndPointRedirect } from 'controllers/movies/moviesEndPointRedirect';
import { updateMovie } from 'controllers/movies/updateMovie';
import { Router } from 'express';
import { auth } from 'middleware/auth';
import createMovieValidator from 'validators/CreateMovieValidator';
import getSingleMovieValidator from 'validators/getSingleMovieValidator';
import schemaValidator from 'validators/schemaValidator';
import updateMovieValidator from 'validators/UpdateMovieValidator';
import moviesPaginatedValidator from 'validators/getMovies/moviesPaginatedValidator';
import moviesPaginatedSearchValidator from 'validators/getMovies/moviesPaginatedSearchValidator';
import { getMoviesPaginatedSearch } from 'controllers/movies/getMoviesPaginatedSearch';
import moviesPaginatedGenresValidator from 'validators/getMovies/moviesPaginatedGenresValidator';
import { getMoviesPaginatedGenres } from 'controllers/movies/getMoviesPaginatedGenres';
import moviesPaginatedSearchGenresValidator from 'validators/getMovies/moviesPaginatedSearchGenresValidator';
import { getMoviesPaginatedSearchGenres } from 'controllers/movies/getMoviesPaginatedSearchGenres';
import likeMovieValidator from 'validators/likeDislikeMovie/likeMovieValidator';
import { likeMovie } from 'controllers/movies/likeMovie';
import dislikeMovieValidator from 'validators/likeDislikeMovie/dislikeMovieValidator';
import { dislikeMovie } from 'controllers/movies/dislikeMovie';

export const movieRouter = Router();

movieRouter.get(
  '/movies/:id',
  auth,
  getSingleMovieValidator,
  schemaValidator,
  getSingleMovie
);

movieRouter.get('/movies', moviesEndPointRedirect);
movieRouter.get(
  '/movies-paginated',
  auth,
  moviesPaginatedValidator,
  schemaValidator,
  getMoviesPaginated
);
movieRouter.get(
  '/movies-paginated-search',
  auth,
  moviesPaginatedSearchValidator,
  schemaValidator,
  getMoviesPaginatedSearch
);
movieRouter.get(
  '/movies-paginated-genres',
  auth,
  moviesPaginatedGenresValidator,
  schemaValidator,
  getMoviesPaginatedGenres
);
movieRouter.get(
  '/movies-paginated-search-genres',
  auth,
  moviesPaginatedSearchGenresValidator,
  schemaValidator,
  getMoviesPaginatedSearchGenres
);

movieRouter.put('/likes', auth, likeMovieValidator, schemaValidator, likeMovie);

movieRouter.put(
  '/dislikes',
  auth,
  dislikeMovieValidator,
  schemaValidator,
  dislikeMovie
);

movieRouter.post(
  '/movies',
  auth,
  createMovieValidator,
  schemaValidator,
  createMovie
);

movieRouter.put(
  '/movies/:id',
  auth,
  updateMovieValidator,
  schemaValidator,
  updateMovie
);

movieRouter.delete('/movies/:id', auth, deleteMovie);
