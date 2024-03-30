import { MoviesRepository } from '@domain/domain-repositories/MoviesRepository';
import Movie from '@domain/models/Movie';

import { Injectable } from '@nestjs/common';

@Injectable()
export class OrderByStudiosWithMostVictories {
  constructor(private moviesRepository: MoviesRepository) {}

  private movieInfo(movie: Movie) {
    return {
      title: movie.title,
      year: movie.year,
      producers: movie.producers.split(/ and |, /),
    };
  }

  private processMovies(movies: Movie[]) {
    const studiosWithMostVictories: { [studio: string]: Movie[] } = {};

    movies.forEach((movie) => {
      const studios = movie.studios.split(/ and |, /);
      studios.forEach((studio) => {
        if (studiosWithMostVictories[studio]) {
          studiosWithMostVictories[studio].push(movie);
        } else {
          studiosWithMostVictories[studio] = [movie];
        }
      });
    });

    return studiosWithMostVictories;
  }

  async execute() {
    const winnerMovies: Movie[] =
      await this.moviesRepository.findManyMoviesByWinner();

    const studiosWithMostVictories = this.processMovies(winnerMovies);

    const studios = Object.keys(studiosWithMostVictories).sort(
      (studioA, studioB) =>
        studiosWithMostVictories[studioB].length -
        studiosWithMostVictories[studioA].length,
    );

    const studiosWithMostVictoriesResponse = studios.map((studio) => ({
      studio,
      numberOfVictories: studiosWithMostVictories[studio].length,
      winners: studiosWithMostVictories[studio].map(this.movieInfo),
    }));

    return studiosWithMostVictoriesResponse;
  }
}
