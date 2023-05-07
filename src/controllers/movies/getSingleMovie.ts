import { Request, Response } from 'express';
import { sanitizeError, sanitizeMovie } from 'util/sanitizers';
import { Movie } from 'database/schemas/Movie';
import { emitter } from 'events/events';

export const getSingleMovie = async (req: Request, res: Response) => {
  const id = req.params.id;

  try {
    const movie = await Movie.findById(id).populate('genres').populate({
      path: 'coverImage',
      select: 'fullSize',
    });
    emitter.emit('incrementMovieView', movie._id);
    return res.status(200).json(sanitizeMovie(movie));
  } catch (e) {
    console.log(e);
    return res.status(500).json(sanitizeError('Server Error'));
  }
};
