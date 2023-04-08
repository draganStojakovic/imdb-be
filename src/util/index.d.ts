import 'express-session';
import { IUser } from 'types/IUser';

declare module 'express-session' {
  interface SessionData {
    user: IUser;
  }
}
