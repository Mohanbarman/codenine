import { IUser, UserDocument } from '../app/user/user.schema';

export class UserTransformer {
  static serializeOne(user: UserDocument): Omit<IUser, 'password'> {
    return {
      id: user.id,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      deletedAt: user.deletedAt,
      email: user.email,
      name: user.name,
      profilePicture: user.profilePicture,
    };
  }

  static serializeMany(users: UserDocument[]): Omit<IUser, 'password'>[] {
    return users.map((user) => this.serializeOne(user));
  }
}
