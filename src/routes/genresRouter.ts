import { Router } from 'express';
import { auth } from 'middleware/auth';
import { getGenres } from 'controllers/getGenres';
import getSingleGenreValidator from 'validators/getSingleGenreValidator';
import schemaValidator from 'validators/schemaValidator';
import { getSingleGenre } from 'controllers/getSingleGenre';

export const genreRouter = Router();

genreRouter.get('/genres', auth, getGenres);

genreRouter.get(
  '/genres/:id',
  auth,
  getSingleGenreValidator,
  schemaValidator,
  getSingleGenre
);
