import { FindManyMovies } from '@app/use-cases/findManyMoviesUseCase';
import { Controller, Get, Param } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { FindMovieResponseDto } from '../dtos/movies/find-movie.dto';
import { GetProducerWithMaxIntervalUseCase } from '@app/use-cases/getProducerWithMaxIntervalUseCase';
import { GetProducerWithTwoAwardsFaster } from '@app/use-cases/getProducerWithTwoAwardsFaster';
import { FindYearsWithMultipleWinnersUseCase } from '@app/use-cases/findYearsWithMultipleWinnersUseCase';
import { OrderByStudiosWithMostVictories } from '@app/use-cases/orderByStudiosWithMostVictories';
import { FindWinnersByYearUseCase } from '@app/use-cases/findWinnersByYearUseCase';

@Controller('movies')
@ApiTags('Movies')
export class MoviesController {
  constructor(
    private findManyMoviesMethod: FindManyMovies,
    private getProducerWithLongestIntervalMethod: GetProducerWithMaxIntervalUseCase,
    private getProducerWithTwoAwardsFasterMethod: GetProducerWithTwoAwardsFaster,
    private findYearsWithMultipleWinnersMethod: FindYearsWithMultipleWinnersUseCase,
    private orderByStudiosWithMostVictoriesMethod: OrderByStudiosWithMostVictories,
    private FindWinnersByYearUseCaseMethod: FindWinnersByYearUseCase,
  ) {}

  @Get('/')
  @ApiOperation({ summary: 'Get All Movies' })
  @ApiResponse({
    status: 201,
    description: 'Movies List',
    type: [FindMovieResponseDto],
  })
  async findManyMovies() {
    return await this.findManyMoviesMethod.execute();
  }

  @Get('/producer-with-longest-interval')
  @ApiOperation({ summary: 'Get Producer With Longest Interval' })
  @ApiResponse({
    status: 201,
    description: 'Producer With Longest Interval',
  })
  async findProducerWithLongestInterval() {
    return await this.getProducerWithLongestIntervalMethod.execute();
  }

  @Get('/producer-with-two-awards-faster')
  @ApiOperation({ summary: 'Get Producer With Two Awards Faster' })
  @ApiResponse({
    status: 201,
    description: 'Producer With Two Awards Faster',
  })
  async findProducerWithTwoAwardsFaster() {
    return await this.getProducerWithTwoAwardsFasterMethod.execute();
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
