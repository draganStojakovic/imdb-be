import { Request, Response } from 'express';
import { sanitizeError, sanitizeWatchList } from 'util/sanitizers';
import { User } from 'database/schemas/User';
import { IWatchList } from 'types/IMovie';

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
        select: 'title coverImage',
        populate: {
          path: 'coverImage',
          select: 'thumbnail -_id',
        },
      });

    return res
      .status(200)
      .json(sanitizeWatchList(response as unknown as IWatchList));
  } catch (e) {
    console.log(e);
    return res.status(500).json(sanitizeError('Server Error'));
  }
};
