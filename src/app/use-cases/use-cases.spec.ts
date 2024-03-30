import { InMemoryMoviesRepository } from '@test/repositories/in-memory-movies-repository';
import { FindManyMovies } from './findManyMoviesUseCase';

describe('UseCases', () => {
  let findManyMovies: FindManyMovies;
  let moviesRepository: InMemoryMoviesRepository;
  beforeEach(() => {
    moviesRepository = new InMemoryMoviesRepository();
    findManyMovies = new FindManyMovies(moviesRepository);
  });

  it('should return all movies', async () => {
    const movies = await findManyMovies.execute();
    expect(movies).toHaveLength(3);
  });
});
