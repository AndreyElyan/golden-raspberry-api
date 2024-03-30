import Movie from '@domain/models/Movie';

export abstract class MoviesRepository {
  abstract findManyMovies(): Promise<Movie[]>;
  abstract getMovieById(id: number): Promise<Movie | null>;
}
