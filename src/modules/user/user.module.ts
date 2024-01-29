import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { UserToken } from './tokens/user.token';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [UserController],
  providers: [
    {
      provide: UserToken.UserServiceInterface.description,
      useClass: UserService,
    },
    {
      provide: UserToken.UserRepositoryInterface.description,
      useClass: UserRepository,
    },
  ],
})
export class UserModule {}
