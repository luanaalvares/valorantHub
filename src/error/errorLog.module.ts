import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { HttpModule } from '@nestjs/axios';
import { ErrorLogSchema} from './schema/errorLog.schema';

@Module({
  controllers: [],
  providers: [],
  imports: [
    MongooseModule.forFeature([{ name: 'Error', schema: ErrorLogSchema }]),
    HttpModule
  ]
})
export class ErrorModule { }