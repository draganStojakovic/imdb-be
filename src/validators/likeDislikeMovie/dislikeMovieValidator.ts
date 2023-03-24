import { query } from 'express-validator';
import { Movie } from 'database/schemas/Movie';

const dislikeMovieValidator = [
  query().custom(async (values) => {
    const { movieId, userId } = values;

    if (!movieId) throw new Error('movieId is required.');
    if (!userId) throw new Error('userId is required.');

    const movie = await Movie.findById(movieId);

    if (!movie) throw new Error('Invalid movie id.');

    const movieDisliked = await Movie.count({ dislikes: userId }).where({
      _id: movieId,
    });

    if (movieDisliked) throw new Error('Movie already disliked.');

    return true;
  }),
];

export default dislikeMovieValidator;
