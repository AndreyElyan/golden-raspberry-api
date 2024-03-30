import { PrismaMoviesRepository } from './prisma/infra-repositories/prisma-movies-repository';
import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { MoviesRepository } from '@domain/domain-repositories/MoviesRepository';

@Module({
  providers: [
    PrismaService,
    {
      provide: MoviesRepository,
      useClass: PrismaMoviesRepository,
    },
  ],
  exports: [MoviesRepository],
})
export class DatabaseModule {}
