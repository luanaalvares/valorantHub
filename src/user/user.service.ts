import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schema/user.schema';
import { Model } from 'mongoose';

@Injectable()
export class UserService {

  constructor(
    @InjectModel(User.name) private userModel: Model<User>
  ) { }

  create(createUserDto: CreateUserDto) {
    const createdCharacter = new this.userModel(createUserDto);
    return createdCharacter.save()
  }

  async findAll() {
    return await this.userModel.find();
  }

  async findOne(id: string) {
    try {
      const user = await this.userModel.findById(id);
      if (!user) {
        throw new NotFoundException('User ID not found');
      }
      return user;
    } catch (error) {
      throw new InternalServerErrorException("Something wrong happened.")
    }
  }

  async findByEmail(email: string) {
    try {
      const user = await this.userModel.findOne({ email: email });
      if (!user) {
        throw new NotFoundException('User email not found');
      }
      return user;
    } catch (error) {
      throw new InternalServerErrorException("Something wrong happened.")
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    try {
      return await this.userModel.findByIdAndUpdate(id, updateUserDto, { new: true });
    } catch (error) {
      throw new InternalServerErrorException("Something wrong happened.")
    }
  }

  async remove(id: string) {
    try {
      return await this.userModel.findByIdAndDelete(id);
    } catch (error) {
      throw new InternalServerErrorException("Something wrong happened.")
    }
  }
}
