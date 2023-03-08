import { Request, Response } from 'express';
import { Genre } from 'database/schemas/Genre';
import { sanitizeError } from 'util/sanitizers';
import { sanitizeGenre } from 'util/sanitizers';

export const getSingleGenre = async (req: Request, res: Response) => {
  const id = req.params.id;

  try {
    const genre = await Genre.findById(id);
    return res.status(200).json(sanitizeGenre(genre));
  } catch (e) {
    console.log(e);
    return res.status(500).json(sanitizeError('Server Error'));
  }
};
