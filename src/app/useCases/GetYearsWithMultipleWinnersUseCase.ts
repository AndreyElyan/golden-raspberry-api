import Movie from '@models/Movie';

export class GetYearsWithMultipleWinnersUseCase {
  constructor(private movieRepository: MovieRepository) {}

  async execute(): Promise<number[]> {
    const movies = await this.movieRepository.getAllMovies();
    const yearsWithMultipleWinners = this.findYearsWithMultipleWinners(movies);
    return yearsWithMultipleWinners;
  }

  private findYearsWithMultipleWinners(movies: Movie[]): number[] {
    const years = movies.map((movie) => movie.year);
    const yearsWithMultipleWinners = years.filter((year) => {
      const winners = movies.filter(
        (movie) => movie.year === year && movie.winner,
      );
      return winners.length > 1;
    });
    return yearsWithMultipleWinners;
  }
}
