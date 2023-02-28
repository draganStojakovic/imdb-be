import { Router } from 'express';
import { auth } from 'src/middleware/auth';
import { guest } from 'src/middleware/guest';
import { me } from '../../controllers/auth/me';
import RegisterValidator from 'src/validators/auth/RegisterValidator';
import SchemaValidator from 'src/validators/schemaValidator';
import { registerUser } from 'src/controllers/auth/register';

export const authRouter = Router();

authRouter.get('/me', auth, me);

authRouter.post(
  '/register',
  guest,
  RegisterValidator,
  SchemaValidator,
  registerUser
);