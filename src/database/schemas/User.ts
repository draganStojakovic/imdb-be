import mongoose, { Schema } from 'mongoose';
import { IUser } from 'types/IUser';

const userSchema = new mongoose.Schema<IUser>(
  {
    fname: { type: String, required: true },
    lname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    watchedMovies: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Movie',
      },
    ],
    watchList: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Movie',
      },
    ],
  },
  { timestamps: true }
);

export const User = mongoose.model('User', userSchema);
