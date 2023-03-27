import { Request, Response } from 'express';
import { Movie } from 'database/schemas/Movie';
import { sanitizeError } from 'util/sanitizers';

export const addLike = async (req: Request, res: Response) => {
  const { movieId, userId } = req.query;

  try {
    await Movie.findByIdAndUpdate(
      { _id: movieId },
      { $push: { likes: userId } }
    );
    return res.status(200).json({
      like: 'added',
      dislike: null,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json(sanitizeError('Server Error'));
  }
};
