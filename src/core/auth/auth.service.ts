import { UserEntity } from '@/modules/user/entities/user.entity';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LoginDTO } from './dtos/login.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,

    private readonly jwtService: JwtService,
  ) {}

  async authenticate(loginDTO: LoginDTO) {
    const user = await this.userRepository.findOneBy({
      username: loginDTO.username,
      password: loginDTO.password,
    });

    if (user.password !== loginDTO.password) {
      throw new UnauthorizedException();
    }

    const payload = {
      userId: user.id,
      username: user.username,
    };

    const accessToken = await this.jwtService.signAsync(payload);

    return {
      accessToken,
      user: {
        userId: user.id,
        username: user.username,
      },
    };
  }
}
