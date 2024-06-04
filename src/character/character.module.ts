import { Module } from '@nestjs/common';
import { CharacterService } from './character.service';
import { CharacterController } from './character.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CharacterSchema } from './schema/character.schema';
import { HttpModule } from '@nestjs/axios';

@Module({
  controllers: [CharacterController],
  providers: [CharacterService],
  imports: [
    MongooseModule.forFeature([{ name: 'Character', schema: CharacterSchema }]),
    HttpModule
  ]
})
export class CharacterModule { }
