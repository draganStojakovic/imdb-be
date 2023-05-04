import 'express-session';
import { IUser } from 'types/IUser';
import { IPoster } from 'types/IMovie';

declare module 'express-session' {
  interface SessionData {
    user: IUser;
    poster: IPoster;
  }
}
