import { MovieRepository } from '@domain/domain-repositories/MovieRepository';
import Movie from '@domain/models/Movie';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PrismaMoviesRepository implements MovieRepository {
  constructor(private prismaService: PrismaService) {}

  async getAllMovies(): Promise<Movie[]> {
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
