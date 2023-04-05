import mongoose, { Schema } from 'mongoose';
import { iUser } from 'types/iUser';

const userSchema = new mongoose.Schema<iUser>(
  {
    fname: { type: String, required: true },
    lname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
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
