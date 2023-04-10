import { IUser } from "./IUser";

export interface IComment {
  _id: string;
  content: string;
  userId: IUser;
}