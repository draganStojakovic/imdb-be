import { Router } from 'express';
import { auth } from 'middleware/auth';
import { getGenres } from 'controllers/getGenres';

export const genreRouter = Router();

genreRouter.get('/genres', auth, getGenres);
