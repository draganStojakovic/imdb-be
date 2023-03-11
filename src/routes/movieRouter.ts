import { createMovie } from 'controllers/movies/createMovie';
import { deleteMovie } from 'controllers/movies/deleteMovie';
import { getMovies } from 'controllers/movies/getMovies';
import { getSingleMovie } from 'controllers/movies/getSingleMovie';
import { updateMovie } from 'controllers/movies/updateMovie';
import { Router } from 'express';
import { auth } from 'middleware/auth';
import createMovieValidator from 'validators/CreateMovieValidator';
import getMoviesValidator from 'validators/getMoviesValidator';
import getSingleMovieValidator from 'validators/getSingleMovieValidator';
import schemaValidator from 'validators/schemaValidator';
import updateMovieValidator from 'validators/UpdateMovieValidator';

export const movieRouter = Router();

movieRouter.get('/movies', auth, getMoviesValidator, getMovies);

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
