import { MoviesRepository } from '@domain/domain-repositories/MoviesRepository';
import Movie from '@domain/models/Movie';
import { findProducerWithFastestTwoAwards } from '@helpers/findProducerWithLongestIntervalAndFastTwoAwards';

import { Injectable } from '@nestjs/common';

@Injectable()
export class GetProducerWithTwoAwardsFaster {
  constructor(private moviesRepository: MoviesRepository) {}

  async execute() {
    const movies: Movie[] = await this.moviesRepository.findManyMovies();

    return findProducerWithFastestTwoAwards(movies);
  }
}
