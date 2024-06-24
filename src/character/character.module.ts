import { Module } from '@nestjs/common';
import { CharacterService } from './character.service';
import { CharacterController } from './character.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CharacterSchema } from './schema/character.schema';
import { HttpModule } from '@nestjs/axios';
import { ErrorLogSchema, errorLog } from 'src/error/schema/errorLog.schema';

@Module({
  controllers: [CharacterController],
  providers: [CharacterService],
  imports: [
    MongooseModule.forFeature([{ name: 'Character', schema: CharacterSchema }]),
    MongooseModule.forFeature([{ name: errorLog.name, schema: ErrorLogSchema }]),
    HttpModule
  ]
})
export class CharacterModule { }
