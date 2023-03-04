import { Request, Response } from 'express';
import { sanitizeError, sanitizeMovie, sanitizeMovies } from 'util/sanitizers';
import { Movie } from 'database/schemas/Movie';

export const getMovies = async (req: Request, res: Response) => {
  const id = req.query.id;
  if (id) {
    try {
      const movie = await Movie.findOne({ _id: id });
      return res.status(200).json(sanitizeMovie(movie));
    } catch (e) {
      console.log(e);
      return res.status(500).json(sanitizeError('Server Error', 500));
    }
  }
  try {
    const movies = await Movie.find();
    return res.status(200).json(sanitizeMovies(movies));
  } catch (e) {
    console.log(e);
    return res.status(500).json(sanitizeError('Server Error', 500));
  }
};
