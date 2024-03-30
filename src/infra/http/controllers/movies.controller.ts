import { FindManyMovies } from '@app/use-cases/findManyMoviesUseCase';
import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { FindMovieResponseDto } from '../dtos/movies/movies.dto';

@Controller('movies')
@ApiTags('Movies')
export class MoviesController {
  constructor(private findManyMoviesMethod: FindManyMovies) {}

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
}
