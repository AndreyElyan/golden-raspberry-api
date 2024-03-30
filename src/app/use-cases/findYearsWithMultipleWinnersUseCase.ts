import { MoviesRepository } from '@domain/domain-repositories/MoviesRepository';
import Movie from '@domain/models/Movie';

import { Injectable } from '@nestjs/common';

@Injectable()
export class FindYearsWithMultipleWinnersUseCase {
  constructor(private moviesRepository: MoviesRepository) {}

  async execute() {
    const movies: Movie[] = await this.moviesRepository.findManyMovies();

    const yearsWithMultipleWinners: { [year: string]: Movie[] } = {};
    const isWinner = (movie: Movie) => movie.winner === 'yes';

    movies.forEach((movie) => {
      if (isWinner(movie)) {
        if (yearsWithMultipleWinners[movie.year]) {
          yearsWithMultipleWinners[movie.year].push(movie);
        } else {
          yearsWithMultipleWinners[movie.year] = [movie];
        }
      }
    });

    const years = Object.keys(yearsWithMultipleWinners).filter(
      (year) => yearsWithMultipleWinners[year].length > 1,
    );

    const yearsWithMultipleWinnersResponse = years.map((year) => ({
      year,
      winners: yearsWithMultipleWinners[year],
    }));

    return yearsWithMultipleWinnersResponse;
  }
}
