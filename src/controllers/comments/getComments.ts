import { Request, Response } from 'express';
import { Movie } from 'database/schemas/Movie';
import { sanitizeError } from 'util/sanitizers';

export const getComments = async (req: Request, res: Response) => {
  const { movieId, page = 2, limit = 10 } = req.query;

  try {
    const movieComments = await Movie.findById(movieId)
      .select('comments -_id')
      .populate({
        path: 'comments',
        select: 'content',
        options: {
          sort: { createdAt: -1 },
          skip: (Number(page) - 1) * Number(limit),
          limit: Number(limit),
        },
        populate: {
          path: 'userId',
          select: 'fname lname',
        },
      });

    const { comments } = movieComments;

    const totalComments = await Movie.findById(movieId).select('comments -_id');

    return res.status(200).json({
      comments,
      totalPages: Math.ceil(
        Number(totalComments.comments.length) / Number(limit)
      ),
      currentPage: Number(page),
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json(sanitizeError('Server Error'));
  }
};
