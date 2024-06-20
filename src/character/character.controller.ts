import { Controller, Get, Post,Put, Body, Patch, Param, Delete } from '@nestjs/common';
import { CharacterService } from './character.service';
import { CreateCharacterDto } from './dto/create-character.dto';
import { UpdateCharacterDto } from './dto/update-character.dto';

@Controller('character')
export class CharacterController {
  constructor(private readonly characterService: CharacterService) {}

  @Post()
  create(@Body() createCharacterDto: CreateCharacterDto) {
    return this.characterService.create(createCharacterDto);
  }

  @Get()
  async findAll() {
    return await this.characterService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string){
    return await this.characterService.findOneById(id);
  }

  ////
  @Put()
  async update(@Body() updateCharacterDto: UpdateCharacterDto) {
    return await this.characterService.update(updateCharacterDto);
  }

  ////
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.characterService.delete(id);
  }
}
