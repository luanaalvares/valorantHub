import { Controller, Get, Post,Put, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { CharacterService } from './character.service';
import { CreateCharacterDto } from './dto/create-character.dto';
import { UpdateCharacterDto } from './dto/update-character.dto';
import { CharacterException } from './character.exception';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('character')
export class CharacterController {
  constructor(private readonly characterService: CharacterService) {}

  @UseGuards(AuthGuard)
  @Post()
  async create(@Body() createCharacterDto: CreateCharacterDto) {
    if(createCharacterDto.displayName === 'Eminem')
      throw new CharacterException()
    this.characterService.create(createCharacterDto);
    return 'Este personagem foi criado'
  }

  @UseGuards(AuthGuard)
  @Get()
  async findAll() {
    return await this.characterService.findAll();
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: string){
    return await this.characterService.findOneById(id);
  }

  @UseGuards(AuthGuard)
  @Put()
  async update(@Body() updateCharacterDto: UpdateCharacterDto) {
    return await this.characterService.update(updateCharacterDto);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.characterService.delete(id);
  }
}
