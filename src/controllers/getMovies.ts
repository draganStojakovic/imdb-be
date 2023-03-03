import { Request, Response } from 'express';
import { Movie } from 'database/schemas/Movie';
import { sanitizeError } from 'util/sanitizers';

export const getMovies = async (req: Request, res: Response) => {
  try {
    const response = await Movie.find();
    return res.status(200).json(response);
  } catch (e) {
    console.log(e);
    return res.status(500).json(sanitizeError('Server Error', 500));
  }
};
