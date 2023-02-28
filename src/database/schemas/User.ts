import mongoose from 'mongoose';
import { iUser } from 'types/iUser';

const userSchema = new mongoose.Schema<iUser>(
  {
    fname: { type: String, required: true },
    lname: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

export const User = mongoose.model('Users', userSchema);
