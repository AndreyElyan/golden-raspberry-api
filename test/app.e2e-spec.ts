import insertData from '../src/infra/database/seed/insert-data';
import { PrismaClient } from '@prisma/client';
import { FIND_ALL_MOVIES } from './mocks';
import { exec } from 'child_process';

describe('Insert data', () => {
  let prisma: PrismaClient;

  beforeAll(() => {
    prisma = new PrismaClient();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it('should insert data', async () => {
    jest.spyOn(console, 'log').mockImplementation(() => {
      return;
    });
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

  it('should run seed script', (done) => {
    exec('npm run seed', (error, stdout, stderr) => {
      if (error) {
        console.log(`error: ${error.message}`);
        done(error);
        return;
      }
      if (stderr) {
        console.log(`stderr: ${stderr}`);
        done(new Error(stderr));
        return;
      }
      console.log(`stdout: ${stdout}`);

      done();
    });
  });
});
