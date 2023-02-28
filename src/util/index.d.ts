import 'express-session';
import { User } from '../types/User';

declare module 'express-session' {
  interface SessionData {
    user: User;
  }
}
