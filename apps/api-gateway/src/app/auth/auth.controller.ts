import { Body, Controller, Post, UsePipes } from '@nestjs/common';
import { CustomValidationPipe } from '@codenine/nestlib';
import { RegisterDTO } from './auth.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @UsePipes(new CustomValidationPipe())
  async register(@Body() registerDto: RegisterDTO) {
    const res = await this.authService.register({
      email: registerDto.email,
      name: registerDto.name,
      password: registerDto.password,
      profilePicture: registerDto.profilePicture,
    })
    console.log(res)
    return {ok: true}
  }
}
