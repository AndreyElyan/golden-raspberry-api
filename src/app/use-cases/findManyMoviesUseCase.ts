import { MoviesRepository } from '@domain/domain-repositories/MoviesRepository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FindManyMovies {
  constructor(private moviesRepository: MoviesRepository) {}

  async execute() {
    return await this.moviesRepository.findManyMovies();
  }
}
