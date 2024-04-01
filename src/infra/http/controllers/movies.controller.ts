import { FindManyMovies } from '@app/use-cases/findManyMoviesUseCase';
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { FindMovieResponseDto } from '../dtos/movies/find-movie.dto';

import { FindYearsWithMultipleWinnersUseCase } from '@app/use-cases/findYearsWithMultipleWinnersUseCase';
import { OrderByStudiosWithMostVictories } from '@app/use-cases/orderByStudiosWithMostVictories';
import { FindWinnersByYearUseCase } from '@app/use-cases/findWinnersByYearUseCase';
import { FindManyMoviesByFilterUseCase } from '@app/use-cases/findManyMoviesByFilterUseCase';
import { FindMovieFilterDTOBody } from '../dtos/movies/find-movies-filter-body.dto';
import { SearchMovieByTextUseCase } from '@app/use-cases/searchMovieByTextUseCase';
import { GetAwardsRangeUseCase } from '@app/use-cases/getAwardRangeUseCase';

@Controller('movies')
@ApiTags('Movies')
export class MoviesController {
  constructor(
    private findManyMoviesMethod: FindManyMovies,
    private findYearsWithMultipleWinnersMethod: FindYearsWithMultipleWinnersUseCase,
    private orderByStudiosWithMostVictoriesMethod: OrderByStudiosWithMostVictories,
    private FindWinnersByYearUseCaseMethod: FindWinnersByYearUseCase,
    private findManyMoviesByFilterMethod: FindManyMoviesByFilterUseCase,
    private searchMovieByTextMethod: SearchMovieByTextUseCase,
    private getAwardRangeUseCaseMethod: GetAwardsRangeUseCase,
  ) {}

  @Get('/all')
  @ApiOperation({ summary: 'Get All Movies' })
  @ApiResponse({
    status: 201,
    description: 'Movies List',
    type: [FindMovieResponseDto],
  })
  async findManyMovies() {
    return await this.findManyMoviesMethod.execute();
  }

  @Get('/awards-range')
  @ApiOperation({ summary: 'Get Awards Range' })
  @ApiResponse({
    status: 201,
    description: 'Awards Range',
  })
  async getAwardsRange() {
    return await this.getAwardRangeUseCaseMethod.execute();
  }

  @Post('/')
  @ApiOperation({ summary: 'Get Movies By Filters' })
  @ApiResponse({
    status: 201,
    description: 'Movies List',
    type: [FindMovieResponseDto],
  })
  async findManyMoviesByFilter(
    @Body()
    { year, studio, producer, winner, title, page }: FindMovieFilterDTOBody,
  ) {
    return await this.findManyMoviesByFilterMethod.execute({
      year,
      studio,
      producer,
      winner,
      title,
      page,
    });
  }

  @Get('/search/:text')
  @ApiOperation({ summary: 'Search Movies By Text' })
  @ApiResponse({
    status: 201,
    description: 'Movies List',
    type: [FindMovieResponseDto],
  })
  async searchMovieByText(@Param('text') text: string) {
    return await this.searchMovieByTextMethod.execute(text);
  }

  @Get('/years-with-multiple-winners')
  @ApiOperation({ summary: 'Get Years With Multiple Winners' })
  @ApiResponse({
    status: 201,
    description: 'Years With Multiple Winners',
  })
  async findYearsWithMultipleWinners() {
    return await this.findYearsWithMultipleWinnersMethod.execute();
  }

  @Get('/studios-with-most-victories')
  @ApiOperation({ summary: 'Get Studios With Most Victories' })
  @ApiResponse({
    status: 201,
    description: 'Studios With Most Victories',
  })
  async orderByStudiosWithMostVictories() {
    return await this.orderByStudiosWithMostVictoriesMethod.execute();
  }

  @Get('/winners-by-year/:year')
  @ApiOperation({ summary: 'Get Winners By Year' })
  @ApiResponse({
    status: 201,
    description: 'Winners By Year',
  })
  async findWinnersByYear(@Param('year') year: string) {
    return await this.FindWinnersByYearUseCaseMethod.execute(year);
  }
}
