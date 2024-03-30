import { MovieRepository } from '@domain/domain-repositories/MovieRepository';
import Movie from '@domain/models/Movie';

export class PrismaMoviesRepository implements MovieRepository {
  private movies: Movie[] = [];

  async getAllMovies(): Promise<Movie[]> {
    return this.movies;
  }

  async getMovieById(id: number): Promise<Movie | null> {
    return this.movies.find((movie) => movie.id === id) || null;
  }
}
