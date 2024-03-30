import Movie from '@domain/models/Movie';

export interface IFindMoviesByFilters {
  year?: string;
  studio?: string;
  producer?: string;
  winner?: boolean;
  title?: string;
}
export abstract class MoviesRepository {
  abstract findManyMovies(): Promise<Movie[]>;
  abstract getMovieById(id: number): Promise<Movie | null>;
  abstract findManyMoviesByYear(year: string): Promise<Movie[]>;
  abstract findManyMoviesByStudio(studio: string): Promise<Movie[]>;
  abstract findManyMoviesByProducer(producer: string): Promise<Movie[]>;
  abstract findManyMoviesByWinner(): Promise<Movie[]>;
  abstract findManyMoviesByTitle(title: string): Promise<Movie[]>;
  abstract findMoviesByFilters(filters: IFindMoviesByFilters): Promise<Movie[]>;
  abstract findManyMoviesByTextField(text: string): Promise<Movie[]>;
}
