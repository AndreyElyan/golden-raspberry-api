import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class FindMovieResponseDto {
  @IsNumber()
  @ApiProperty({ example: 1 })
  id: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: '2017' })
  year: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'Transformers: The Last Knight' })
  title: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'Paramount Pictures' })
  studios: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'Don Murphy, Tom DeSanto' })
  producers: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'yes' })
  winner: string;
}
