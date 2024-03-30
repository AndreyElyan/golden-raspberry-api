import { PrismaMoviesRepository } from './prisma/infra-repositories/prisma-movies-repository';
import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';

@Module({
  providers: [PrismaMoviesRepository, PrismaService],
  exports: [PrismaMoviesRepository],
})
export class DatabaseModule {}
