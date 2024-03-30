import { MoviesRepository } from '@domain/domain-repositories/MoviesRepository';
import Movie from '@domain/models/Movie';
import { findProducerWithLongestInterval } from '@helpers/findProducerWithLongestIntervalAndFastTwoAwards';
import { Injectable } from '@nestjs/common';

@Injectable()
export class GetProducerWithMaxIntervalUseCase {
  constructor(private moviesRepository: MoviesRepository) {}

  async execute() {
    const movies: Movie[] = await this.moviesRepository.findManyMovies();

    return findProducerWithLongestInterval(movies);
  }
}
