import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiResponse } from '../responses/api.response';
import { AuthService } from './auth.service';
import { LoginDTO } from './dtos/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  @HttpCode(HttpStatus.OK)
  async authenticate(@Body() loginDTO: LoginDTO) {
    const data = await this.authService.authenticate(loginDTO);

    return ApiResponse.success({
      data,
    });
  }
}
