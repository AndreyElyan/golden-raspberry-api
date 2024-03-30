import { MoviesRepository } from '@domain/domain-repositories/MoviesRepository';
import Movie from '@domain/models/Movie';

import { Injectable } from '@nestjs/common';

@Injectable()
export class GetAwardsRangeUseCase {
  constructor(private moviesRepository: MoviesRepository) {}

  private getProducerMovies(movies: Movie[], producer: string) {
    return movies.filter((movie) => movie.producers.includes(producer));
  }

  private sortMoviesByYear(movies: Movie[]) {
    return movies.sort(
      (movieA, movieB) => parseInt(movieA.year) - parseInt(movieB.year),
    );
  }

  private calculateProducerAwardIntervals(movies: Movie[], producer: string) {
    const producerMovies = this.getProducerMovies(movies, producer);

    const sortedMovies = this.sortMoviesByYear(producerMovies);

    return sortedMovies
      .map((movie, index) => {
        if (index === 0) return null;
        const previousWin = parseInt(sortedMovies[index - 1].year);
        const followingWin = parseInt(movie.year);

        return {
          producer,
          interval: followingWin - previousWin,
          previousWin,
          followingWin,
        };
      })
      .filter((interval) => interval !== null);
  }

  async execute() {
    const movies: Movie[] =
      await this.moviesRepository.findManyMoviesByWinner();
    const producers = [
      ...new Set(movies.flatMap((movie) => movie.producers.split(/ and |, /))),
    ];

    const intervals = producers.flatMap((producer) =>
      this.calculateProducerAwardIntervals(movies, producer),
    );

    const minInterval = Math.min(...intervals.map(({ interval }) => interval));
    const maxInterval = Math.max(...intervals.map(({ interval }) => interval));

    const min = intervals.filter(({ interval }) => interval === minInterval);
    const max = intervals.filter(({ interval }) => interval === maxInterval);

    return { min, max };
  }
}
