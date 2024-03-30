import { MoviesRepository } from '@domain/domain-repositories/MoviesRepository';
import Movie from '@domain/models/Movie';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { IFindMoviesByFilters } from '@app/entities/FindMoviesByFilter';

@Injectable()
export class PrismaMoviesRepository implements MoviesRepository {
  constructor(private prismaService: PrismaService) {}

  async findManyMovies(): Promise<Movie[]> {
    const movies = await this.prismaService.movie.findMany();

    return movies;
  }

  findManyMoviesByProducer(producer: string): Promise<Movie[]> {
    const movies = this.prismaService.movie.findMany({
      where: {
        producers: {
          contains: producer,
        },
      },
    });

    return movies;
  }

  findManyMoviesByStudio(studio: string): Promise<Movie[]> {
    const movies = this.prismaService.movie.findMany({
      where: {
        studios: {
          contains: studio,
        },
      },
    });

    return movies;
  }

  findManyMoviesByTitle(title: string): Promise<Movie[]> {
    const movies = this.prismaService.movie.findMany({
      where: {
        title: {
          contains: title,
        },
      },
    });

    return movies;
  }

  findManyMoviesByWinner(): Promise<Movie[]> {
    const movies = this.prismaService.movie.findMany({
      where: {
        winner: 'yes',
      },
    });

    return movies;
  }

  findManyMoviesByYear(year: string): Promise<Movie[]> {
    const movies = this.prismaService.movie.findMany({
      where: {
        year,
      },
    });

    return movies;
  }

  findMoviesByFilters(filters: IFindMoviesByFilters): Promise<Movie[]> {
    const { year, studio, producer, winner, title, page } = filters;
    const movies = this.prismaService.movie.findMany({
      where: {
        year,
        studios: {
          contains: studio,
        },
        producers: {
          contains: producer,
        },
        winner: winner ? 'yes' : '',
        title: {
          contains: title,
        },
      },
      take: 10,
      skip: page ? (page - 1) * 10 : 0,
    });

    return movies;
  }

  findManyMoviesByTextField(text: string): Promise<Movie[]> {
    const movies = this.prismaService.movie.findMany({
      where: {
        OR: [
          {
            title: {
              contains: text,
            },
          },
          {
            studios: {
              contains: text,
            },
          },
          {
            year: {
              contains: text,
            },
          },
          {
            producers: {
              contains: text,
            },
          },
        ],
      },
    });

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
