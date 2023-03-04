import { createMovie } from 'controllers/createMovie';
import { getMovies } from 'controllers/getMovies';
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
