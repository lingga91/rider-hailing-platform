import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  HttpCode,
  NotFoundException,
} from '@nestjs/common';
import { LocationService } from './location.service';
import { CreateLocationDto } from './dto/create-location.dto';
import { History } from './schemas/history.schema';
import { Driver } from './schemas/driver.schema';

@Controller('location')
export class LocationController {
  constructor(private readonly locationService: LocationService) {}

  @Post()
  @HttpCode(200)
  async ingest(@Body() dto: CreateLocationDto): Promise<void> {
    await this.locationService.ingestLocation(dto);
  }

  @Get('history/:driver_id')
  async getDriverHistory(
    @Param('driver_id') driverId: string,
  ): Promise<History[]> {
    const history =
      await this.locationService.getDriverLocationHistory(driverId);
    return history;
  }

  @Get(':driver_id')
  async getLatestLocation(
    @Param('driver_id') driverId: string,
  ): Promise<Driver> {
    const latest = await this.locationService.getLatestDriverLocation(driverId);

    if (!latest) {
      throw new NotFoundException(
        `No location found for driver_id: ${driverId}`,
      );
    }

    return latest;
  }
}
