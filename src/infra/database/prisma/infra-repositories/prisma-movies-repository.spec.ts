import { PrismaMoviesRepository } from './prisma-movies-repository';
import { PrismaService } from '../prisma.service';
import Movie from '@domain/models/Movie';

describe('PrismaMoviesRepository', () => {
  let prismaService: PrismaService;
  let prismaMoviesRepository: PrismaMoviesRepository;

  beforeEach(() => {
    prismaService = new PrismaService();
    prismaMoviesRepository = new PrismaMoviesRepository(prismaService);
  });

  describe('PrismaRepository', () => {
    it('should return an array of movies', async () => {
      prismaService.movie.findMany = jest
        .fn()
        .mockResolvedValue([
          { id: 1, title: 'Movie 1', year: '2022', winner: 'yes' } as Movie,
          { id: 2, title: 'Movie 2', year: '2023', winner: 'no' } as Movie,
        ]);

      const movies = await prismaMoviesRepository.findManyMovies();

      expect(movies).toHaveLength(2);
      expect(movies[0].title).toBe('Movie 1');
      expect(movies[1].title).toBe('Movie 2');
    });
  });

  it('should return a movie', async () => {
    prismaService.movie.findUnique = jest.fn().mockResolvedValue({
      id: 1,
      title: 'Movie 1',
      year: '2022',
      winner: 'yes',
      producers: 'Adam Sandler',
    } as Movie);

    const movie =
      await prismaMoviesRepository.findManyMoviesByProducer('Adam Sandler');

    expect(movie).toBeDefined();
  });

  it('should return a movie by studio', async () => {
    prismaService.movie.findUnique = jest.fn().mockResolvedValue({
      id: 1,
      title: 'Movie 1',
      year: '2022',
      winner: 'yes',
      studios: 'Disney',
    } as Movie);

    const movie = await prismaMoviesRepository.findManyMoviesByStudio('Disney');

    expect(movie).toBeDefined();
  });

  it('should return a movie by title', async () => {
    prismaService.movie.findUnique = jest.fn().mockResolvedValue({
      id: 1,
      title: 'Movie 1',
      year: '2022',
      winner: 'yes',
    } as Movie);

    const movie = await prismaMoviesRepository.findManyMoviesByTitle('Movie 1');

    expect(movie).toBeDefined();
  });

  it('should return movies by winner', async () => {
    prismaService.movie.findMany = jest
      .fn()
      .mockResolvedValue([
        { id: 1, title: 'Movie 1', year: '2022', winner: 'yes' } as Movie,
        { id: 2, title: 'Movie 2', year: '2023', winner: 'no' } as Movie,
      ]);

    const movies = await prismaMoviesRepository.findManyMoviesByWinner();

    expect(movies[0].winner).toBe('yes');
  });

  it('should be return a movie by year', async () => {
    prismaService.movie.findUnique = jest.fn().mockResolvedValue({
      id: 1,
      title: 'Movie 1',
      year: '2022',
      winner: 'yes',
    } as Movie);

    const movie = await prismaMoviesRepository.findManyMoviesByYear('2022');

    expect(movie).toBeDefined();
  });

  it('should be return a movie by filters', async () => {
    prismaService.movie.findMany = jest
      .fn()
      .mockResolvedValue([
        { id: 1, title: 'John Wick', year: '2022', winner: 'yes' } as Movie,
        { id: 2, title: 'Movie 2', year: '2023', winner: 'no' } as Movie,
      ]);

    const movies = await prismaMoviesRepository.findMoviesByFilters({
      winner: true,
      year: '2022',
      page: 1,
    });

    const isWinnerBeFalse = await prismaMoviesRepository.findMoviesByFilters({
      winner: false,
      year: '2022',
    });

    expect(isWinnerBeFalse).toHaveLength(2);

    expect(movies[0].title).toBe('John Wick');
  });

  it('should be return a movie by text', async () => {
    prismaService.movie.findMany = jest
      .fn()
      .mockResolvedValue([
        { id: 1, title: 'John Wick', year: '2022', winner: 'yes' } as Movie,
        { id: 2, title: 'Movie 2', year: '2023', winner: 'no' } as Movie,
      ]);

    const movies =
      await prismaMoviesRepository.findManyMoviesByTextField('John Wick');

    expect(movies[0].title).toBe('John Wick');
  });

  it('should be return a movie by id', async () => {
    prismaService.movie.findUnique = jest.fn().mockResolvedValue({
      id: 1,
      title: 'John Wick',
      year: '2022',
      winner: 'yes',
    } as Movie);

    const movie = await prismaMoviesRepository.getMovieById(1);

    expect(movie).toBeDefined();
  });
});
