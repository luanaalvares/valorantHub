import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCharacterDto } from './dto/create-character.dto';
import { UpdateCharacterDto } from './dto/update-character.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Character } from './schema/character.schema';
import { Model } from 'mongoose';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class CharacterService {
  constructor(
    @InjectModel(Character.name) private characterModel: Model<Character>,
    private readonly httpService: HttpService
  ) { }

  create(createCharacterDto: CreateCharacterDto) {
    return 'This action adds a new character';
  }

  async findAll() {
    var hasCharacters = await this.characterModel.exists({});
    if (!hasCharacters) {
      //will fetch from valorant api if database is empty, please check the api docs.
      var request = await this.httpService.get('https://valorant-api.com/v1/agents?isPlayableCharacter=true').toPromise()
      var body = request.data
      body.data.map(async (character) => {
        var newCharacter: Character = {
          uuid: character.uuid,
          displayName: character.displayName,
          description: character.description,
          developerName: character.developerName,
          characterTags: character.characterTags,
          displayIcon: character.displayIcon,
          portrait: character.fullPortrait,
          role: {
            name: character.role.displayName,
            description: character.role.description
          },
          abilities: character.abilities,
          isCustom: false
        }
        //save to database
        var newCharacterModel = new this.characterModel(newCharacter)
        await newCharacterModel.save()
      })
    }
    return await this.characterModel.find();
  }

  async update(updateCharacterDto): Promise<Character> {
    return await this.characterModel.findByIdAndUpdate(updateCharacterDto.id, updateCharacterDto, {new: true});
  }

  ////
  async delete(id: string): Promise<Character> {
    return await this.characterModel.findByIdAndDelete(id);
  }
  
  async findOneById(id: string): Promise<Character> {
    const character = await this.characterModel.findById(id);
    if (!character) {
      throw new NotFoundException('User ID not found');
    }
    return character;   
  }
  
}
