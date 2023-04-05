import { Router } from 'express';
import { authRouter } from './auth/AuthRouter';
import { movieRouter } from './movieRouter';
import { genreRouter } from './genresRouter';
import { commentsRouter } from './commentsRouter';

const router = Router();

router.use('/auth', authRouter);

router.use(movieRouter);

router.use(genreRouter);

router.use(commentsRouter);

export default router;
