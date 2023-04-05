import { deleteComment } from 'controllers/comments/deleteComment';
import { getComments } from 'controllers/comments/getComments';
import { postComment } from 'controllers/comments/postComment';
import { Router } from 'express';
import { auth } from 'middleware/auth';
import deleteCommentValidator from 'validators/comments_validators/deleteCommentValidator';
import getMovieCommentsValidator from 'validators/comments_validators/getMovieCommentsValidator';
import postCommentValidator from 'validators/comments_validators/postCommentValidator';
import schemaValidator from 'validators/schemaValidator';

export const commentsRouter = Router();

commentsRouter.get(
  '/comments',
  auth,
  getMovieCommentsValidator,
  schemaValidator,
  getComments
);

commentsRouter.post(
  '/comments',
  auth,
  postCommentValidator,
  schemaValidator,
  postComment
);

commentsRouter.delete(
  '/comments',
  auth,
  deleteCommentValidator,
  schemaValidator,
  deleteComment
);
