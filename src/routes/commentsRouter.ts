import { postComment } from 'controllers/comments/postComment';
import { Router } from 'express';
import { auth } from 'middleware/auth';
import postCommentValidator from 'validators/comments_validators/postCommentValidator';
import schemaValidator from 'validators/schemaValidator';

export const commentsRouter = Router();

commentsRouter.post(
  '/comments',
  auth,
  postCommentValidator,
  schemaValidator,
  postComment
);
