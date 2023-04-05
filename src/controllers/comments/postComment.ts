import { Request, Response } from 'express';
import { Comment } from 'database/schemas/Comment';
import { Movie } from 'database/schemas/Movie';
import { sanitizeComment, sanitizeError } from 'util/sanitizers';

export const postComment = async (req: Request, res: Response) => {
  const { content, userId, movieId } = req.body;

  try {
    const newComment = await Comment.create({
      content,
      userId,
    });
    await Movie.findByIdAndUpdate(
      { _id: movieId },
      { $push: { comments: newComment._id } }
    );
    return res.status(201).json(sanitizeComment(newComment));
  } catch (e) {
    console.log(e);
    return res.status(500).json(sanitizeError('Server Error'));
  }
};
