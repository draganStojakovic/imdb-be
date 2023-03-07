import { Request, Response } from 'express';
import { Movie } from 'database/schemas/Movie';
import { sanitizeError, sanitizeMovie } from 'util/sanitizers';

export const createMovie = async (req: Request, res: Response) => {
  const { title, description, coverImage, genres } = req.body;

  try {
    const newMovie = await Movie.create({
      title: title,
      description: description,
      coverImage: coverImage,
      genres: genres,
    });
    const movie = await Movie.findById(newMovie._id).populate('genres');
    return res.status(201).json(sanitizeMovie(movie));
  } catch (e) {
    console.log(e);
    return res.status(500).json(sanitizeError('Server Error'));
  }
};
