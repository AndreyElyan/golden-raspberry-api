import { FindManyMovies } from '@app/use-cases/findManyMoviesUseCase';
import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { FindMovieResponseDto } from '../dtos/movies/find-movie.dto';
import { GetProducerWithMaxIntervalUseCase } from '@app/use-cases/getProducerWithMaxIntervalUseCase';
import { GetProducerWithTwoAwardsFaster } from '@app/use-cases/getProducerWithTwoAwardsFaster';

@Controller('movies')
@ApiTags('Movies')
export class MoviesController {
  constructor(
    private findManyMoviesMethod: FindManyMovies,
    private getProducerWithLongestIntervalMethod: GetProducerWithMaxIntervalUseCase,
    private getProducerWithTwoAwardsFasterMethod: GetProducerWithTwoAwardsFaster,
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
}
