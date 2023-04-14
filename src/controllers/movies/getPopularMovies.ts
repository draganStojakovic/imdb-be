import { Request, Response } from 'express';
import { Movie } from 'database/schemas/Movie';
import { sanitizeError, sanitizePopularMovies } from 'util/sanitizers';

export const getPopularMovies = async (req: Request, res: Response) => {
  try {
    const response = await Movie.find({})
      .limit(10)
      .sort({ views: -1 })
      .select('_id title');
    return res.status(200).json(sanitizePopularMovies(response));
  } catch (e) {
    console.log(e);
    return res.status(500).json(sanitizeError('Server Error'));
  }
};
