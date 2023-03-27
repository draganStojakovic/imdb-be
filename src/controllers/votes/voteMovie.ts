import { Request, Response } from 'express';
import { Movie } from 'database/schemas/Movie';
import { addLike } from './addLike';
import { removeLike } from './removeLike';
import { removeDislikeAddLike } from './removeDislikeAddLike';
import { addDislike } from './addDislike';
import { removeDislike } from './removeDislike';
import { removeLikeAddDislike } from './removeLikeAddDislike';

export const voteMovie = async (req: Request, res: Response) => {
  const { movieId, userId, button } = req.query;

  const liked = await Movie.count({ likes: userId }).where({ _id: movieId });
  const disliked = await Movie.count({ dislikes: userId }).where({
    _id: movieId,
  });
  
  switch (button) {
    case 'like':
      if (liked === 0 && disliked === 0) {
        addLike(req, res);
      } else if (liked > 0 && disliked === 0) {
        removeLike(req, res);
      } else if (liked === 0 && disliked > 0) {
        removeDislikeAddLike(req, res);
      }
      break;
    case 'dislike':
      if (liked === 0 && disliked === 0) {
        addDislike(req, res);
      } else if (liked === 0 && disliked > 0) {
        removeDislike(req, res);
      } else if (liked > 0 && disliked === 0) {
        removeLikeAddDislike(req, res);
      }
      break;
  }
};
