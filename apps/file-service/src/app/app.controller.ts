import { Controller, Get, Inject, Param } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @Inject('AUTH_SERVICE') private client: ClientProxy
  ) {}

  @Get(':id')
  async getData(@Param('id') id: string) {
    try {
      const res = await firstValueFrom(
        this.client.send<Record<string, unknown>>('user.getById', id)
      );
      return res;
    } catch (e) {
      return e;
    }
  }
}
