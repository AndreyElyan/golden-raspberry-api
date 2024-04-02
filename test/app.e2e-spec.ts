import insertData from '../src/infra/database/seed/insert-data';
import { PrismaClient } from '@prisma/client';
import { FIND_ALL_MOVIES } from './mocks';

describe('Insert data', () => {
  let prisma: PrismaClient;

  beforeAll(() => {
    prisma = new PrismaClient();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it('should insert data', async () => {
    await insertData();

    const data = await prisma.movie.findMany();

    expect(data.length).toBe(206);

    expect(data).toEqual(FIND_ALL_MOVIES);

    expect(data[0].id).toBe(1);

    expect(data[0].title).toBe("Can't Stop the Music");

    expect(data[0].year).toBe('1980');
  });

  it('should not insert data if already exists', async () => {
    jest.spyOn(console, 'log').mockImplementation(() => {
      return;
    });

    const response = await insertData();

    expect(response).toBe(undefined);
  });
});
