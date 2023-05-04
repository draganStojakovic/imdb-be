import mongoose from 'mongoose';
import { IPosterDB } from 'types/IMovie';

const posterSchema = new mongoose.Schema<IPosterDB>({
  thumbnail: {
    type: String,
    required: true,
    unique: true,
  },
  fullSize: {
    type: String,
    required: true,
    unique: true,
  },
});

export const Poster = mongoose.model('Poster', posterSchema);
