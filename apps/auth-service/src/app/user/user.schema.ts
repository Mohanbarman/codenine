import mongoose from 'mongoose';

export interface IUser {
  id: string;
  email: string;
  password: string;
  name: string;
  profilePicture: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
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

export const USER_SCHEMA = 'USER_SCHEMA';
