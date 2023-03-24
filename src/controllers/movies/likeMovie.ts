import { Request, Response } from 'express';
import { Movie } from 'database/schemas/Movie';
import { sanitizeError, sanitizeMovie } from 'util/sanitizers';

export const likeMovie = async (req: Request, res: Response) => {
  const { movieId, userId } = req.query;

  try {
    const movie = await Movie.findById(movieId);
    movie.likes.push(String(userId));
    movie.save();
    await movie.populate('genres likes');
    return res.status(200).json(sanitizeMovie(movie));
  } catch (e) {
    console.log(e);
    return res.status(500).json(sanitizeError('Server Error'));
  }
};
