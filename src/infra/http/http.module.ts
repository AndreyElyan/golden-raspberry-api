import { DatabaseModule } from '@infra/database/database.module';
import { PrismaMoviesRepository } from '@infra/database/prisma/infra-repositories/prisma-movies-repository';
import { PrismaService } from '@infra/database/prisma/prisma.service';
import { Module } from '@nestjs/common';
import { MoviesController } from './controllers/movies.controller';
import { FindManyMovies } from '@app/use-cases/findManyMoviesUseCase';
import { MoviesRepository } from '@domain/domain-repositories/MoviesRepository';

@Module({
  imports: [DatabaseModule],
  providers: [PrismaMoviesRepository, PrismaService, FindManyMovies],
  controllers: [MoviesController],
})
export class HttpModule {}
