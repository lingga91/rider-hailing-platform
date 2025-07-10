import { Injectable, HttpException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { History } from './schemas/history.schema';
import { Driver } from './schemas/driver.schema';
import { CreateLocationDto } from './dto/create-location.dto';

@Injectable()
export class LocationService {
  constructor(
    @InjectModel(History.name) private historyModel: Model<History>,
    @InjectModel(Driver.name) private driverModel: Model<Driver>,
  ) {}

  async ingestLocation(dto: CreateLocationDto): Promise<void> {
    const { driver_id, latitude, longitude, timestamp } = dto;

    try {
      // Store in history
      await this.historyModel.create(dto);

      // Update only if newer than existing
      await this.driverModel.findOneAndUpdate(
        {
          driver_id: driver_id,
          $or: [
            { timestamp: { $lt: timestamp } },
            { timestamp: { $exists: false } },
          ],
        },
        {
          $set: {
            latitude,
            longitude,
            timestamp,
          },
        },
        { upsert: true },
      );
    } catch (error) {
      if (error.code !== 11000) {
        throw new HttpException('something went wrong', 500);
      }
    }

    return;
  }

  async getLatestDriverLocation(driverId: string): Promise<Driver | null> {
    try {
      const latest = await this.driverModel
        .findOne({ driver_id: driverId.trim() })
        .lean();
      return latest;
    } catch (error) {
      throw new HttpException('something went wrong', 500);
    }
  }

  async getDriverLocationHistory(driverId: string): Promise<History[]> {
    try {
      const history = await this.historyModel
        .find({ driver_id: driverId.trim() })
        .sort({ timestamp: 1 }) // oldest to newest
        .lean();
      return history;
    } catch (error) {
      throw new HttpException('something went wrong', 500);
    }
  }
}
