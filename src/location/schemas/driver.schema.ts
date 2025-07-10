import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Driver extends Document {
  @Prop({ required: true, unique: true })
  driver_id: string;

  @Prop({ required: true })
  latitude: number;

  @Prop({ required: true })
  longitude: number;

  @Prop({ required: true })
  timestamp: Date;
}

export const DriverSchema = SchemaFactory.createForClass(Driver);

