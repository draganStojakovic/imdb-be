import { Request, Response } from 'express';
import { sanitizeError, sanitizeMovies } from 'util/sanitizers';
import { Movie } from 'database/schemas/Movie';

export const getSearchedMovies = async (req: Request, res: Response) => {
  const { search, page = 1, limit = 10 } = req.query;

  try {
    const movies = await Movie.find({ title: search })
      .limit(Number(limit) * 1)
      .skip((Number(page) - 1) * Number(limit))
      .populate('genres')
      .sort('-createdAt');

    const count = await Movie.count({ title: search });

    const sanitizedMovies = sanitizeMovies(movies);

    return res.status(200).json({
      movies: sanitizedMovies,
      totalPages: Math.ceil(count / Number(limit)),
      currentPage: Number(page),
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json(sanitizeError('Server Error'));
  }
};
