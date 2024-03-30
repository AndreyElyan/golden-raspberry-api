import { InMemoryMoviesRepository } from '@test/repositories/in-memory-movies-repository';
import { FindManyMovies } from './findManyMoviesUseCase';
import { FindManyMoviesByFilterUseCase } from './findManyMoviesByFilterUseCase';
import { IFindMoviesByFilters } from '@app/entities/FindMoviesByFilter';
import { FindWinnersByYearUseCase } from './findWinnersByYearUseCase';
import { FindYearsWithMultipleWinnersUseCase } from './findYearsWithMultipleWinnersUseCase';
import { GetAwardsRangeUseCase } from './getAwardRangeUseCase';
import { OrderByStudiosWithMostVictories } from './orderByStudiosWithMostVictories';
import { SearchMovieByTextUseCase } from './searchMovieByTextUseCase';

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
  let orderByStudiosWithMoreAwards: OrderByStudiosWithMostVictories;
  let searchMovieByText: SearchMovieByTextUseCase;

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
    orderByStudiosWithMoreAwards = new OrderByStudiosWithMostVictories(
      moviesRepository,
    );
    searchMovieByText = new SearchMovieByTextUseCase(moviesRepository);
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

  it('should return order by studios with more awards', async () => {
    const movies = await orderByStudiosWithMoreAwards.execute();

    const studio = {
      studio: 'Columbia Pictures',
      numberOfVictories: 7,
      winners: [
        {
          title: 'Rambo: First Blood Part II',
          year: '1985',
          producers: ['Buzz Feitshans'],
        },
        {
          title: 'Leonard Part 6',
          year: '1987',
          producers: ['Bill Cosby'],
        },
        {
          title: 'Striptease',
          year: '1996',
          producers: ['Andrew Bergman', 'Mike Lobell'],
        },
      ],
    };

    const result = movies.filter(
      (movie) => movie.studio === 'Columbia Pictures',
    )[0];

    expect(result.studio).toEqual(studio.studio);
  });

  it('should return movies by text', async () => {
    const movies = await searchMovieByText.execute('The');
    expect(movies).toHaveLength(1);
  });
});
