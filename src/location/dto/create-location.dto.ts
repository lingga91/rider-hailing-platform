import { IsString, IsNumber, IsISO8601 } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateLocationDto {
  @IsString()
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  driver_id: string;

  @IsNumber()
  latitude: number;

  @IsNumber()
  longitude: number;

  @IsISO8601()
  timestamp: string;
}
