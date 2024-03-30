import { Module } from '@nestjs/common';
import { PrismaMoviesRepository } from './prisma/infra-repositories/prisma-movies-repository';
import { PrismaService } from './prisma/prisma.service';

@Module({
  imports: [],
  providers: [PrismaService, PrismaMoviesRepository],
  exports: [PrismaMoviesRepository],
})
export class DatabaseModule {}
