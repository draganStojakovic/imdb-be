import mongoose from 'mongoose';
import { IGenre } from 'types/IGenre';

const genresSchema = new mongoose.Schema<IGenre>({
  name: { type: String, required: true },
});

export const Genre = mongoose.model('Genre', genresSchema);
