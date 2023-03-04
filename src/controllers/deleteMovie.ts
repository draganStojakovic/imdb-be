import { Request, Response } from 'express';
import { Movie } from 'database/schemas/Movie';
import { sanitizeError, sanitizeMovie } from 'util/sanitizers';

export const deleteMovie = async (req: Request, res: Response) => {
  const id = req.params.id;

  try {
    const deletedMovie = await Movie.findByIdAndDelete(id);
    return res.status(200).json(sanitizeMovie(deletedMovie));
  } catch (e) {
    console.log(e);
    return res.status(500).json(sanitizeError('Server Error', 500));
  }
};