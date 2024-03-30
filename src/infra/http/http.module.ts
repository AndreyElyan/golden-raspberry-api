import { DatabaseModule } from '@infra/database/database.module';
import { PrismaMoviesRepository } from '@infra/database/prisma/infra-repositories/prisma-movies-repository';
import { PrismaService } from '@infra/database/prisma/prisma.service';
import { Module } from '@nestjs/common';
import { MoviesController } from './controllers/movies.controller';
import { FindManyMovies } from '@app/use-cases/findManyMoviesUseCase';
import { FindYearsWithMultipleWinnersUseCase } from '@app/use-cases/findYearsWithMultipleWinnersUseCase';
import { OrderByStudiosWithMostVictories } from '@app/use-cases/orderByStudiosWithMostVictories';
import { FindWinnersByYearUseCase } from '@app/use-cases/findWinnersByYearUseCase';
import { FindManyMoviesByFilterUseCase } from '@app/use-cases/findManyMoviesByFilterUseCase';
import { SearchMovieByTextUseCase } from '@app/use-cases/searchMovieByTextUseCase';
import { GetAwardsRangeUseCase } from '@app/use-cases/getAwardRangeUseCase';

@Module({
  imports: [DatabaseModule],
  providers: [
    PrismaMoviesRepository,
    PrismaService,
    FindManyMovies,
    FindYearsWithMultipleWinnersUseCase,
    OrderByStudiosWithMostVictories,
    FindWinnersByYearUseCase,
    FindManyMoviesByFilterUseCase,
    SearchMovieByTextUseCase,
    GetAwardsRangeUseCase,
  ],
  controllers: [MoviesController],
})
export class HttpModule {}
