import * as mongoose from 'mongoose';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async create(email: string, password: string) {
    const createdUser = new this.userModel({
      email,
      password,
    });
    const value = await createdUser.save();
    return value;
  }

  async findOne(id: string) {
    const objectId = new mongoose.Types.ObjectId(id);
    return this.userModel.findById(objectId);
  }
  find(email: string) {
    return this.userModel.find({ email }).exec();
  }

  async update(id: string, attrs: Partial<User>) {
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    Object.assign(user, attrs);
    return user.save();
  }

  async remove(id: string) {
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user.remove();
  }
}
