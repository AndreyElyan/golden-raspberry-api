import { InMemoryMoviesRepository } from '@test/repositories/in-memory-movies-repository';
import { FindManyMovies } from './findManyMoviesUseCase';
import { FindManyMoviesByFilterUseCase } from './findManyMoviesByFilterUseCase';
import { IFindMoviesByFilters } from '@app/entities/FindMoviesByFilter';
import { FindWinnersByYearUseCase } from './findWinnersByYearUseCase';
import { FindYearsWithMultipleWinnersUseCase } from './findYearsWithMultipleWinnersUseCase';
import { GetAwardsRangeUseCase } from './getAwardRangeUseCase';

let moviesRepository: InMemoryMoviesRepository;

const filters: IFindMoviesByFilters = {
  year: '2015',
};

describe('UseCases', () => {
  let findManyMovies: FindManyMovies;
  let findManyMoviesByFilter: FindManyMoviesByFilterUseCase;
  let findWinnersByYear: FindWinnersByYearUseCase;
  let findYearsWithMultipleWinners: FindYearsWithMultipleWinnersUseCase;
  let getAwardRange: GetAwardsRangeUseCase;
  beforeEach(() => {
    moviesRepository = new InMemoryMoviesRepository();
    findManyMovies = new FindManyMovies(moviesRepository);
    findManyMoviesByFilter = new FindManyMoviesByFilterUseCase(
      moviesRepository,
    );
    findWinnersByYear = new FindWinnersByYearUseCase(moviesRepository);
    findYearsWithMultipleWinners = new FindYearsWithMultipleWinnersUseCase(
      moviesRepository,
    );
    getAwardRange = new GetAwardsRangeUseCase(moviesRepository);
  });

  it('should return all movies', async () => {
    const movies = await findManyMovies.execute();
    expect(movies).toHaveLength(8);
  });

  it('should return movies by year', async () => {
    const movies = await findManyMoviesByFilter.execute(filters);
    expect(movies).toHaveLength(5);
  });

  it('should return winners by year', async () => {
    const movies = await findWinnersByYear.execute('1980');
    expect(movies).toHaveLength(1);
  });

  it('should return years with multiple winners', async () => {
    const movies = await findYearsWithMultipleWinners.execute();
    expect(movies).toHaveLength(3);
  });

  it('should return awards range', async () => {
    const movies = await getAwardRange.execute();

    expect(movies).toEqual({
      min: [
        {
          producer: 'Joel Silver',
          interval: 1,
          previousWin: 1990,
          followingWin: 1991,
        },
      ],
      max: [
        {
          producer: 'Matthew Vaughn',
          interval: 13,
          previousWin: 2002,
          followingWin: 2015,
        },
      ],
    });
  });
});
