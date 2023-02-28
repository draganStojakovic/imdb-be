import 'express-session';
import { iUser } from 'types/iUser';

declare module 'express-session' {
  interface SessionData {
    user: iUser;
  }
}
