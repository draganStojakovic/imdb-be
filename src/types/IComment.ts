import { iUser } from "./iUser";

export interface IComment {
  _id: string;
  content: string;
  userId: iUser;
}