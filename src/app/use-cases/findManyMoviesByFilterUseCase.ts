import {
  IFindMoviesByFilters,
  MoviesRepository,
} from '@domain/domain-repositories/MoviesRepository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FindManyMovies {
  constructor(private moviesRepository: MoviesRepository) {}

  async execute(filters: IFindMoviesByFilters) {
    const { year, studio, producer, winner, title } = filters;
    const movies = await this.moviesRepository.findMoviesByFilters({
      year,
      studio,
      producer,
      winner,
      title,
    });

    return movies;
  }
}
