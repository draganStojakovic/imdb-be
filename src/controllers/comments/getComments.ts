import { Request, Response } from 'express';
import { Movie } from 'database/schemas/Movie';
import { sanitizeError } from 'util/sanitizers';

export const getComments = async (req: Request, res: Response) => {
  const { movieId, limit = 5 } = req.query;

  try {
    const movieComments = await Movie.findById(movieId)
      .select('comments -_id')
      .populate({
        path: 'comments',
        select: 'content',
        options: {
          sort: { createdAt: -1 },
          skip: 0,
          limit: Number(limit),
        },
        populate: {
          path: 'userId',
          select: 'fname lname',
        },
      });

    const { comments } = movieComments;

    const totalComments = await Movie.findById(movieId).select('comments -_id');

    let remainingComments =
      Number(totalComments.comments.length) - Number(limit);

    if (remainingComments < 0) remainingComments = 0;

    return res.status(200).json({
      comments,
      shownComments: Number(comments.length),
      remainingComments,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json(sanitizeError('Server Error'));
  }
};
