import { Request, Response } from 'express';
import { Movie } from 'database/schemas/Movie';
import { sanitizeError, sanitizeStrippedDownMovies } from 'util/sanitizers';
import { genresQueryFormatter } from 'util/queryFormatters';

export const getRelatedMovies = async (req: Request, res: Response) => {
  const genres = req.query.genres;

  const formattedGenres = genresQueryFormatter(genres as string);

  try {
    const response = await Movie.find({ genres: formattedGenres })
      .limit(10)
      .select('_id coverImage')
      .populate({
        path: 'coverImage',
        select: 'fullSize -_id',
      });

    return res.status(200).json(sanitizeStrippedDownMovies(response, true));
  } catch (e) {
    console.log(e);
    return res.status(500).json(sanitizeError('Server Error'));
  }
};
