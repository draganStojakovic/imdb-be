import { Request, Response } from 'express';
import { sanitizeError } from 'util/sanitizers';
import { Movie } from 'database/schemas/Movie';

export const addMovieView = async (req: Request, res: Response) => {
  const id = req.params.id;

  try {
    await Movie.findByIdAndUpdate({ _id: id }, { $inc: { views: 1 } });
    return res.status(200).json({ views: 'ok' });
  } catch (e) {
    console.log(e);
    return res.status(500).json(sanitizeError('Server Error'));
  }
};
