import { DatabaseModule } from '@infra/database/database.module';
import { PrismaMoviesRepository } from '@infra/database/prisma/infra-repositories/prisma-movies-repository';
import { PrismaService } from '@infra/database/prisma/prisma.service';
import { Module } from '@nestjs/common';

@Module({
  imports: [DatabaseModule],
  providers: [PrismaMoviesRepository, PrismaService],
})
export class HttpModule {}
