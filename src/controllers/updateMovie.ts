import { Request, Response } from 'express';
import { Movie } from 'database/schemas/Movie';
import { sanitizeError, sanitizeMovie } from 'util/sanitizers';

export const updateMovie = async (req: Request, res: Response) => {
  const id = req.params.id;
  const payload = req.body;

  try {
    const updatedMovie = await Movie.findByIdAndUpdate(id, payload, {
      new: true,
    });
    const movie = await Movie.findById(updatedMovie._id).populate('genres');
    return res.status(202).json(sanitizeMovie(movie));
  } catch (e) {
    console.log(e);
    return res.status(500).json(sanitizeError('Server Error'));
  }
};
