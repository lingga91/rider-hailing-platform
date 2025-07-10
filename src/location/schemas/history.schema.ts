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

