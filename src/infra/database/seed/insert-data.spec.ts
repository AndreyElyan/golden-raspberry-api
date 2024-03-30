/* eslint-disable @typescript-eslint/no-var-requires */
import insertData from './insert-data';
import { PrismaClient } from '@prisma/client';

jest.mock('fs', () => ({
  existsSync: jest.fn().mockReturnValue(true),
  createdReadStream: jest.fn().mockReturnValue({
    pipe: jest.fn().mockReturnThis(),
    on: jest.fn().mockImplementation((event, callback) => {
      if (event === 'data') {
        callback({
          year: '2022',
          title: 'Movie 1',
          studios: 'Studio 1',
          producers: 'Producer 1',
          winner: 'Yes',
        });
        callback({
          year: '2023',
          title: 'Movie 2',
          studios: 'Studio 2',
          producers: 'Producer 2',
          winner: 'No',
        });
      } else if (event === 'end') {
        callback();
      }
      return this;
    }),
  }),
}));

describe('insertData', () => {
  let mockPrismaClient: jest.Mocked<PrismaClient>;

  beforeEach(() => {
    mockPrismaClient = {
      movie: {
        findMany: jest.fn().mockReturnValue([]),
        create: jest.fn(),
      },
      $disconnect: jest.fn(),
    } as unknown as jest.Mocked<PrismaClient>;

    (mockPrismaClient.movie.create as jest.Mock).mockImplementation(
      () => new Promise((resolve) => setTimeout(resolve, 100)),
    );
  });

  afterEach(async () => {
    await mockPrismaClient.$disconnect();
  });

  it('should log an error if there is an error inserting data', async () => {
    jest.spyOn(console, 'error').mockImplementation(() => {});

    await insertData();

    expect(console.error).toHaveBeenCalled();
  });
});
