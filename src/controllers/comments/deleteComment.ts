import { Request, Response } from 'express';
import { Comment } from 'database/schemas/Comment';
import { Movie } from 'database/schemas/Movie';
import { sanitizeError } from 'util/sanitizers';

export const deleteComment = async (req: Request, res: Response) => {
  const { commentId, movieId, userId } = req.body;

  if (req.session.user._id !== userId) {
    return res
      .status(403)
      .json(sanitizeError('Permission denied', 'body', '403'));
  }

  try {
    await Comment.findByIdAndDelete(commentId);
    await Movie.findByIdAndUpdate(
      { _id: movieId },
      { $pull: { comments: commentId } }
    );
    return res.status(200).json({ delete: 'ok' });
  } catch (e) {
    console.log(e);
    return res.status(500).json(sanitizeError('Server Error'));
  }
};
