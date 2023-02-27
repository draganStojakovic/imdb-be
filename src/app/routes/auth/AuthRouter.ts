import { Router } from 'express';
import { auth } from 'src/app/middleware/auth';
import { me } from 'src/app/controllers/auth/me';
import { guest } from 'src/app/middleware/guest';
import RegisterValidator from 'src/app/validators/auth/RegisterValidator';
import SchemaValidator from 'src/app/validators/schemaValidator';
import { registerUser } from 'src/app/controllers/auth/register';

export const authRouter = Router();

authRouter.get('/me', auth, me);

authRouter.post(
  '/register',
  guest,
  RegisterValidator,
  SchemaValidator,
  registerUser
);
