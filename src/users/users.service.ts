import * as mongoose from 'mongoose';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { User } from './user.entity';
import * as shortid from 'shortid';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  // async create(email: string, password: string) {
  //   const createdUser = new this.userModel({
  //     email,
  //     password,
  //   });
  //   const value = await createdUser.save();
  //   return value;
  // }
  async create(email: string, password: string) {
    const createdUser = new this.userModel({
      // _id: new mongoose.Types.ObjectId().toString(),
      email,
      password,
    });
    const value = await createdUser.save();
    return value;
  }

  async findOne(id: string): Promise<User | null> {
    const objectId = new mongoose.Types.ObjectId(id);
    return this.userModel.findById(objectId).exec();
  }
  find(email: string) {
    return this.userModel.find({ email }).exec();
  }

  async findAll() {
    return this.userModel.find().exec();
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
