import { Request, Response } from 'express';
import { sanitizeError, sanitizeMovies } from 'util/sanitizers';
import { Movie } from 'database/schemas/Movie';

export const getMovies = async (req: Request, res: Response) => {
  try {
    const movies = await Movie.find().populate('genres');
    return res.status(200).json(sanitizeMovies(movies));
  } catch (e) {
    console.log(e);
    return res.status(500).json(sanitizeError('Server Error'));
  }
};
