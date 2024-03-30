import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

export class FindMovieFilterDTOBody {
  @IsString()
  @IsOptional()
  @ApiProperty({ example: '2017' })
  year?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ example: 'Transformers' })
  title?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ example: 'Paramount Pictures' })
  studio?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ example: 'Don Murphy, Tom DeSanto' })
  producer?: string;

  @IsBoolean()
  @IsOptional()
  @ApiProperty({ example: true })
  winner?: boolean;

  @IsNumber()
  @IsOptional()
  @ApiProperty({ example: 1 })
  page?: number;
}
