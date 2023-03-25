import { Request, Response } from 'express';
import { Movie } from 'database/schemas/Movie';
import { sanitizeError, sanitizeMovie } from 'util/sanitizers';

export const addLike = async (req: Request, res: Response) => {
  const { movieId, userId } = req.query;

  try {
    const updatedMovie = await Movie.findByIdAndUpdate(
      { _id: movieId },
      { $push: { likes: userId } },
      {
        new: true,
      }
    );
    await updatedMovie.populate('genres');
    return res.status(200).json(sanitizeMovie(updatedMovie));
  } catch (e) {
    console.log(e);
    return res.status(500).json(sanitizeError('Server Error'));
  }
};
