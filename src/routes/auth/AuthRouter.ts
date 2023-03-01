import { Router } from 'express';
import { me } from 'controllers/auth/me';
import registerValidator from 'validators/auth/RegisterValidator';
import { registerUser } from 'controllers/auth/register';
import { auth } from 'middleware/auth';
import { guest } from 'middleware/guest';
import schemaValidator from 'validators/schemaValidator';
import loginValidator from 'validators/auth/LogInValidator';
import { loginUser } from 'controllers/auth/login';
import { logOutUser } from 'controllers/auth/logout';

export const authRouter = Router();

authRouter.post('/me', auth, me);

authRouter.post(
  '/register',
  guest,
  registerValidator,
  schemaValidator,
  registerUser
);

authRouter.post('/login', guest, loginValidator, schemaValidator, loginUser);

authRouter.post('/logout', auth, logOutUser);
