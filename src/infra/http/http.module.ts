import { DatabaseModule } from '@infra/database/database.module';
import { PrismaMoviesRepository } from '@infra/database/prisma/infra-repositories/prisma-movies-repository';
import { PrismaService } from '@infra/database/prisma/prisma.service';
import { Module } from '@nestjs/common';
import { MoviesController } from './controllers/movies.controller';
import { FindManyMovies } from '@app/use-cases/findManyMoviesUseCase';
import { GetProducerWithMaxIntervalUseCase } from '@app/use-cases/getProducerWithMaxIntervalUseCase';

@Module({
  imports: [DatabaseModule],
  providers: [
    PrismaMoviesRepository,
    PrismaService,
    FindManyMovies,
    GetProducerWithMaxIntervalUseCase,
  ],
  controllers: [MoviesController],
})
export class HttpModule {}
