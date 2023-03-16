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

export const movieRouter = Router();

movieRouter.get('/movies', auth, moviesEndPointRedirect);
movieRouter.get(
  '/movies-paginated',
  moviesPaginatedValidator,
  schemaValidator,
  getMoviesPaginated
);
movieRouter.get(
  '/movies-paginated-search',
  moviesPaginatedSearchValidator,
  schemaValidator,
  getMoviesPaginatedSearch
);
movieRouter.get(
  '/movies-paginated-genres',
  moviesPaginatedGenresValidator,
  schemaValidator,
  getMoviesPaginatedGenres
);
movieRouter.get(
  '/movies-paginated-search-genres',
  moviesPaginatedSearchGenresValidator,
  schemaValidator,
  getMoviesPaginatedSearchGenres
);

movieRouter.get(
  '/movies/:id',
  auth,
  getSingleMovieValidator,
  schemaValidator,
  getSingleMovie
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
