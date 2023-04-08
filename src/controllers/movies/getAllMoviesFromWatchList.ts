import { Request, Response } from 'express';
import { sanitizeError } from 'util/sanitizers';
import { User } from 'database/schemas/User';

export const getAllMoviesFromWatchList = async (
  req: Request,
  res: Response
) => {
  const userId = req.session.user._id;

  try {
    const response = await User.findById(userId)
      .select('watchList -_id')
      .populate({
        path: 'watchList',
        select: '_id title coverImage',
      });

    const { watchList } = response;

    return res.status(200).json(watchList);
  } catch (e) {
    console.log(e);
    return res.status(500).json(sanitizeError('Server Error'));
  }
};
