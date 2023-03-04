import { createMovie } from 'controllers/createMovie';
import { deleteMovie } from 'controllers/deleteMovie';
import { getMovies } from 'controllers/getMovies';
import { updateMovie } from 'controllers/updateMovie';
import { Router } from 'express';
import { auth } from 'middleware/auth';
import movieValidator from 'validators/MovieValidator';
import schemaValidator from 'validators/schemaValidator';

export const movieRouter = Router();

movieRouter.get('/movies', auth, getMovies);

movieRouter.post(
  '/movies/create',
  auth,
  movieValidator,
  schemaValidator,
  createMovie
);

movieRouter.put(
  '/movies/update/:id',
  auth,
  movieValidator,
  schemaValidator,
  updateMovie
);

movieRouter.delete('/movies/:id', auth, deleteMovie);
