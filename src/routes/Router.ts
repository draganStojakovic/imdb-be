import { Router } from 'express';
import { authRouter } from './auth/AuthRouter';
import { movieRouter } from './movieRouter';
import { genreRouter } from './genresRouter';

const router = Router();

router.use('/auth', authRouter);

router.use(movieRouter);

router.use(genreRouter);

export default router;
