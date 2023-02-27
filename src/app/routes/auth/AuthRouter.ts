import { Router } from 'express';
import { auth } from 'src/app/middleware/auth';
import { me } from 'src/app/controllers/auth/me';

export const authRouter = Router();

authRouter.get('/me', auth, me);