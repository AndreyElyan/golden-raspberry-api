import { MoviesRepository } from '@domain/domain-repositories/MoviesRepository';
import Movie from '@domain/models/Movie';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PrismaMoviesRepository implements MoviesRepository {
  constructor(private prismaService: PrismaService) {}

  async findManyMovies(): Promise<Movie[]> {
    const movies = await this.prismaService.movie.findMany();

    return movies;
  }

  async getMovieById(id: number): Promise<Movie | null> {
    const movie = await this.prismaService.movie.findUnique({
      where: {
        id,
      },
    });

    return movie;
  }
}
