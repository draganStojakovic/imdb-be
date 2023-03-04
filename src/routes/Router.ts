import { Router } from 'express';
import { authRouter } from './auth/AuthRouter';
import { movieRouter } from './movieRouter';

const router = Router();

router.use('/auth', authRouter);

router.use(movieRouter);

export default router;
