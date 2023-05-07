import { Movie } from 'database/schemas/Movie';

export default async function incrementMovieView(
  movieId: string
): Promise<void> {
  await Movie.findByIdAndUpdate({ _id: movieId }, { $inc: { views: 1 } });
}
