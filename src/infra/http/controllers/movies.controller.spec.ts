import { TestingModule } from '@nestjs/testing';
import { MoviesController } from './movies.controller';
import { FindManyMovies } from '@app/use-cases/findManyMoviesUseCase';
import { FindYearsWithMultipleWinnersUseCase } from '@app/use-cases/findYearsWithMultipleWinnersUseCase';
import { OrderByStudiosWithMostVictories } from '@app/use-cases/orderByStudiosWithMostVictories';
import { FindWinnersByYearUseCase } from '@app/use-cases/findWinnersByYearUseCase';
import { FindManyMoviesByFilterUseCase } from '@app/use-cases/findManyMoviesByFilterUseCase';
import { SearchMovieByTextUseCase } from '@app/use-cases/searchMovieByTextUseCase';
import { GetAwardsRangeUseCase } from '@app/use-cases/getAwardRangeUseCase';
import { createTestingModule } from '@test/test.module';

describe('MoviesController', () => {
  let controller: MoviesController;

  beforeEach(async () => {
    const module: TestingModule = await createTestingModule({
      controllers: [MoviesController],
      providers: [
        { provide: FindManyMovies, useValue: {} },
        { provide: FindYearsWithMultipleWinnersUseCase, useValue: {} },
        { provide: OrderByStudiosWithMostVictories, useValue: {} },
        { provide: FindWinnersByYearUseCase, useValue: {} },
        { provide: FindManyMoviesByFilterUseCase, useValue: {} },
        { provide: SearchMovieByTextUseCase, useValue: {} },
        { provide: GetAwardsRangeUseCase, useValue: {} },
      ],
    }).compile();

    controller = module.get<MoviesController>(MoviesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return an array of movies', async () => {
    const movies = await controller.findManyMovies();

    expect(movies).toBeDefined();
  });

  it('should return an array of movies by filter', async () => {
    const movies = await controller.findManyMoviesByFilter({
      year: '2022',
      studio: 'Disney',
      producer: 'Adam Sandler',
      winner: true,
      title: 'Movie 1',
      page: 1,
    });

    expect(movies).toBeDefined();
  });

  it('should return an array of movies by text', async () => {
    const movies = await controller.searchMovieByText('Movie 1');

    expect(movies).toBeDefined();
  });

  it('should return an array of movies by year', async () => {
    const movies = await controller.findWinnersByYear('2022');

    expect(movies).toBeDefined();
  });

  it('should return an array of movies by studios with most victories', async () => {
    const movies = await controller.orderByStudiosWithMostVictories();

    expect(movies).toBeDefined();
  });

  it('should return an array of years with multiple winners', async () => {
    const movies = await controller.findYearsWithMultipleWinners();

    expect(movies).toBeDefined();
  });

  it('should return an array of awards range', async () => {
    const movies = await controller.getAwardsRange();

    expect(movies).toBeDefined();
  });
});
