import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<Error>;

@Schema({timestamps: true, id: true, collection: 'errors'})
export class errorLog {
    
  @Prop()
  errorDate: Date;

  @Prop()
  errorRoute: string;

  @Prop()
  error: string;
}

export const ErrorLogSchema = SchemaFactory.createForClass(errorLog);