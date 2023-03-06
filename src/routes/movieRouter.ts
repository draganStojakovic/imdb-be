import { createMovie } from 'controllers/createMovie';
import { deleteMovie } from 'controllers/deleteMovie';
import { getMovies } from 'controllers/getMovies';
import { getSingleMovie } from 'controllers/getSingleMovie';
import { updateMovie } from 'controllers/updateMovie';
import { Router } from 'express';
import { auth } from 'middleware/auth';
import createMovieValidator from 'validators/CreateMovieValidator';
import getSingleMovieValidator from 'validators/getSingleMovieValidator';
import schemaValidator from 'validators/schemaValidator';
import updateMovieValidator from 'validators/UpdateMovieValidator';

export const movieRouter = Router();

movieRouter.get('/movies', auth, getMovies);

movieRouter.get('/movies/:id', auth, getSingleMovieValidator, getSingleMovie);

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
