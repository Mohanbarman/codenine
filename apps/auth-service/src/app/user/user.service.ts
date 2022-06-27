import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { passwordManager } from '../../utilities';
import { IUser, UserDocument, USER_SCHEMA } from './user.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(USER_SCHEMA) private userModel: Model<UserDocument>
  ) {}

  getById(id: string): Promise<UserDocument> {
    if (!mongoose.isValidObjectId(id)) return null;
    return this.userModel.findById(id).exec();
  }

  getByEmail(email: string): Promise<UserDocument> {
    return this.userModel.findOne({ email }).exec();
  }

  async create(user: Partial<IUser>): Promise<UserDocument> {
    user.password = await passwordManager.encrypt(user.password.trim());
    return this.userModel.create(user);
  }
}
