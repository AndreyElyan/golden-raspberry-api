import { IFindMoviesByFilters } from '@app/entities/FindMoviesByFilter';
import { MoviesRepository } from '@domain/domain-repositories/MoviesRepository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FindManyMoviesByFilterUseCase {
  constructor(private moviesRepository: MoviesRepository) {}

  async execute(filters: IFindMoviesByFilters) {
    const { year, studio, producer, winner, title, page } = filters;
    const movies = await this.moviesRepository.findMoviesByFilters({
      year,
      studio,
      producer,
      winner,
      title,
      page,
    });

    return movies;
  }
}
