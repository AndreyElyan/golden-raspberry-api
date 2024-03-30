import { MoviesRepository } from '@domain/domain-repositories/MoviesRepository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SearchMovieByTextUseCase {
  constructor(private moviesRepository: MoviesRepository) {}

  async execute(text: string) {
    return await this.moviesRepository.findManyMoviesByTextField(text);
  }
}
