import { Controller, Logger } from '@nestjs/common';
import { MessagePattern, RpcException } from '@nestjs/microservices';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @MessagePattern('user.getById')
  async getUser(id: string) {
    const user = await this.userService.getById(id);
    Logger.debug('Received', id)
    if (!user) {
      Logger.debug('User not found', id)
      throw new RpcException('User not found');
    }
    Logger.debug('Sending', user)
    return { data: { id: user.id } };
  }
}
