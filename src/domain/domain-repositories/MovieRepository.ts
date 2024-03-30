import Movie from '@domain/models/Movie';

export abstract class MovieRepository {
  abstract getAllMovies(): Promise<Movie[]>;
  abstract getMovieById(id: number): Promise<Movie | null>;
}
