import mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';

export interface IUser {
  id: string;
  email: string;
  password: string;
  name: string;
  profilePicture: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;

  validatePassword(password: string): Promise<boolean>;
}

export type UserDocument = IUser & Document;

export const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
  },

  name: {
    type: String,
    required: true,
    default: null,
  },

  profilePicture: {
    type: String,
    required: false,
    default: null,
  },

  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
  },

  updatedAt: {
    type: Date,
    required: true,
    default: Date.now,
    set: Date.now,
  },

  deletedAt: {
    type: Date,
    required: false,
    default: null,
  },
});

UserSchema.post('save', async (doc: UserDocument) => {
  doc.password = await bcrypt.hash(doc.password, 10);
});

UserSchema.methods.validatePassword = async function (password: string) {
  return await bcrypt.compare(password, this.password);
};

export const USER_SCHEMA = 'USER_SCHEMA';
