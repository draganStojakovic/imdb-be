import { Request, Response } from 'express';
import { sanitizeError, sanitizeMovies } from 'util/sanitizers';
import { Movie } from 'database/schemas/Movie';

export const getMoviesPaginatedSearch = async (req: Request, res: Response) => {
  const { page = 1, limit = 10, search } = req.query;
  
  try {
    const movies = await Movie.find({
      title: { $regex: search, $options: 'i' },
    })
      .limit(Number(limit) * 1)
      .skip((Number(page) - 1) * Number(limit))
      .populate('genres');

    const count = await Movie.count({
      title: { $regex: search, $options: 'i' },
    });

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
