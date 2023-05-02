import mongoose from 'mongoose';
import { IPoster } from 'types/IMovie';

const posterSchema = new mongoose.Schema<IPoster>({
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
