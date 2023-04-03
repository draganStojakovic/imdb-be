import { Request, Response } from 'express';
import { sanitizeError, sanitizeMovie } from 'util/sanitizers';
import { Movie } from 'database/schemas/Movie';

export const getSingleMovie = async (req: Request, res: Response) => {
  const id = req.params.id;

  try {
    const movie = await Movie.findById(id)
      .populate('genres')
      .populate({
        path: 'comments',
        select: 'content',
        options: {
          sort: { createdAt: -1 },
          skip: 0,
          limit: 5,
        },
        populate: {
          path: 'userId',
          select: ['fname', 'lname'],
        },
      });
    return res.status(200).json(sanitizeMovie(movie));
  } catch (e) {
    console.log(e);
    return res.status(500).json(sanitizeError('Server Error'));
  }
};
