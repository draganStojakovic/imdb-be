import { Router } from 'express';
import { auth } from 'middleware/auth';

export const movieRouter = Router();

movieRouter.get('/movies', auth);
