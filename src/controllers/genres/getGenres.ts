import { Request, Response } from 'express';
import { Genre } from 'database/schemas/Genre';
import { sanitizeError } from 'util/sanitizers';
import { sanitizeGenres } from 'util/sanitizers';

export const getGenres = async (req: Request, res: Response) => {
  try {
    const genres = await Genre.find();
    return res.status(200).json(sanitizeGenres(genres));
  } catch (e) {
    console.log(e);
    return res.status(500).json(sanitizeError('Server Error'));
  }
};
