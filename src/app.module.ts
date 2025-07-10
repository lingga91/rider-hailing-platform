import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LocationModule } from './location/location.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://mongo:27017/rider-hailing-dev'),
    LocationModule,
  ],
})
export class AppModule {}
