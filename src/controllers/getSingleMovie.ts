import { Request, Response } from 'express';
import { sanitizeError, sanitizeMovie } from 'util/sanitizers';
import { Movie } from 'database/schemas/Movie';

export const getSingleMovie = async (req: Request, res: Response) => {
  const id = req.params.id;

  try {
    const movie = await Movie.findById(id);
    if (!movie) return res.status(404).json(sanitizeError('Not Found'));
    return res.status(200).json(sanitizeMovie(movie));
  } catch (e) {
    console.log(e);
    return res.status(500).json(sanitizeError('Server Error'));
  }
};
