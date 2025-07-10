import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class History extends Document {
  @Prop({ required: true })
  driver_id: string;

  @Prop({ required: true })
  latitude: number;

  @Prop({ required: true })
  longitude: number;

  @Prop({ default: Date.now })
  timestamp: Date;
}

export const HistorySchema = SchemaFactory.createForClass(History);
HistorySchema.index({ driver_id: 1, timestamp:-1, latitude: 1, longitude: 1 }, { unique: true });
