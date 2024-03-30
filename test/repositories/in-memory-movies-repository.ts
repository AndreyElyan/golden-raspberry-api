import { IFindMoviesByFilters } from '@app/entities/FindMoviesByFilter';
import { MoviesRepository } from '@domain/domain-repositories/MoviesRepository';
import Movie from '@domain/models/Movie';
import { moviesMock, winnerMovies } from './movies.mock';

export class InMemoryMoviesRepository implements MoviesRepository {
  public filterMoviesRequest = InMemoryMoviesRepository;

  public movies: Movie[] = moviesMock;

  public winnerMovies: Movie[] = winnerMovies;

  async findManyMovies(): Promise<Movie[]> {
    return this.movies;
  }

  async getMovieById(id: number): Promise<Movie | null> {
    return this.movies.find((movie) => movie.id === id) || null;
  }

  async findManyMoviesByYear(year: string): Promise<Movie[]> {
    return this.movies.filter((movie) => movie.year === year);
  }

  async findManyMoviesByStudio(studio: string): Promise<Movie[]> {
    return this.movies.filter((movie) => movie.studios === studio);
  }

  async findManyMoviesByProducer(producer: string): Promise<Movie[]> {
    return this.movies.filter((movie) => movie.producers === producer);
  }

  async findManyMoviesByWinner(): Promise<Movie[]> {
    return this.winnerMovies.filter((movie) => movie.winner === 'yes');
  }

  async findManyMoviesByTitle(title: string): Promise<Movie[]> {
    return this.movies.filter((movie) => movie.title === title);
  }

  async findMoviesByFilters(filters: IFindMoviesByFilters): Promise<Movie[]> {
    return this.movies.filter((movie) => {
      return (
        movie.year === filters.year ||
        movie.studios === filters.studio ||
        movie.producers === filters.producer
      );
    });
  }

  async findManyMoviesByTextField(text: string): Promise<Movie[]> {
    return this.movies.filter((movie) => {
      return (
        movie.title.includes(text) ||
        movie.producers.includes(text) ||
        movie.studios.includes(text)
      );
    });
  }
}
