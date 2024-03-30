import { IFindMoviesByFilters } from '@app/entities/FindMoviesByFilter';
import { MoviesRepository } from '@domain/domain-repositories/MoviesRepository';
import Movie from '@domain/models/Movie';

export class InMemoryMoviesRepository implements MoviesRepository {
  public movies: Movie[] = [];

  public filterMoviesRequest = InMemoryMoviesRepository;

  public findManyMoviesResponse: Movie[] = [
    {
      id: 203,
      year: '2019',
      title: 'Cats',
      studios: 'Universal Pictures',
      producers: 'Debra Hayward, Tim Bevan, Eric Fellner, and Tom Hooper',
      winner: 'yes',
    },
    {
      id: 206,
      year: '2019',
      title: 'A Madea Family Funeral',
      studios: 'Lionsgate',
      producers: 'Ozzie Areu, Will Areu, and Mark E. Swinton',
      winner: '',
    },
    {
      id: 207,
      year: '2019',
      title: 'Rambo: Last Blood',
      studios: 'Lionsgate',
      producers:
        'Avi Lerner, Kevin King Templeton, Yariv Lerner, and Les Weldon',
      winner: '',
    },
  ];

  async findManyMovies(): Promise<Movie[]> {
    return this.findManyMoviesResponse;
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
    return this.movies.filter((movie) => movie.winner);
  }

  async findManyMoviesByTitle(title: string): Promise<Movie[]> {
    return this.movies.filter((movie) => movie.title === title);
  }

  async findMoviesByFilters(filters: IFindMoviesByFilters): Promise<Movie[]> {
    return this.movies.filter((movie) => {
      return (
        (!filters.year || movie.year === filters.year) &&
        (!filters.studio || movie.studios === filters.studio) &&
        (!filters.producer || movie.producers === filters.producer) &&
        (!filters.title || movie.title === filters.title)
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
