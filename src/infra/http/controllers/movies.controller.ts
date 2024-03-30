import { FindManyMovies } from '@app/use-cases/findManyMoviesUseCase';
import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { FindMovieResponseDto } from '../dtos/movies/find-movie.dto';
import { GetProducerWithMaxIntervalUseCase } from '@app/use-cases/getProducerWithMaxIntervalUseCase';

@Controller('movies')
@ApiTags('Movies')
export class MoviesController {
  constructor(
    private findManyMoviesMethod: FindManyMovies,
    private getProducerWithLongestIntervalMethod: GetProducerWithMaxIntervalUseCase,
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

  @ApiTags('Get Producer With Longest Interval')
  @Get('/producer-with-longest-interval')
  @ApiOperation({ summary: 'Get Producer With Longest Interval' })
  @ApiResponse({
    status: 201,
    description: 'Producer With Longest Interval',
  })
  async findProducerWithLongestInterval() {
    return await this.getProducerWithLongestIntervalMethod.execute();
  }
}
