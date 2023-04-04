import { query } from 'express-validator';
import { Comment } from 'database/schemas/Comment';
import { Movie } from 'database/schemas/Movie';
import { User } from 'database/schemas/User';

const deleteCommentValidator = [
  query('commentId')
    .exists({ checkFalsy: true })
    .withMessage('commentId query is required')
    .isString()
    .withMessage('commentId query must be string type')
    .custom(async (commentId: string) => {
      const commentExists = await Comment.exists({ _id: commentId });
      if (!commentExists) throw new Error('Comment not found');
      return true;
    }),
  query('movieId')
    .exists({ checkFalsy: true })
    .withMessage('movieId query is required')
    .isString()
    .withMessage('movieId query must be string type')
    .custom(async (movieId: string) => {
      const movieExists = await Movie.exists({ _id: movieId });
      if (!movieExists) throw new Error('Movie not found');
      return true;
    }),
  query('userId')
    .exists({ checkFalsy: true })
    .withMessage('movieId query is required')
    .isString()
    .withMessage('movieId query must be string type')
    .custom(async (userId: string) => {
      const userExists = await User.exists({ _id: userId });
      if (!userExists) throw new Error('User not found');
      return true;
    }),
];

export default deleteCommentValidator;
