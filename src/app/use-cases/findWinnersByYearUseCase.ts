import { MoviesRepository } from '@domain/domain-repositories/MoviesRepository';
import Movie from '@domain/models/Movie';

import { Injectable } from '@nestjs/common';

@Injectable()
export class FindWinnersByYearUseCase {
  constructor(private moviesRepository: MoviesRepository) {}

  async execute(year: string) {
    const movies: Movie[] =
      await this.moviesRepository.findManyMoviesByWinner();

    const winnersByYear = movies.filter((movie) => movie.year === year);

    return winnersByYear;
  }
}
