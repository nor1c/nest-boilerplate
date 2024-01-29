import { ApiResponse } from '@/core/responses/api.response';
import { Body, Controller, Delete, Get, HttpStatus, Inject, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { CreateUserDTO } from './dtos/create-user.dto';
import { UpdateUserDTO } from './dtos/update-user.dto';
import { UserEntity } from './entities/user.entity';
import { UserServiceInterface } from './interfaces/user.service.interface';
import { UserToken } from './tokens/user.token';

@Controller('user')
export class UserController {
  constructor(
    @Inject(UserToken.UserServiceInterface.description)
    private readonly userService: UserServiceInterface<UserEntity>,
  ) {}

  @Get('/')
  async findAll(): Promise<ApiResponse<UserEntity[]>> {
    const users = await this.userService.findAll();

    return ApiResponse.success<UserEntity[]>({
      data: users,
    });
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<ApiResponse<UserEntity>> {
    const user = await this.userService.findById(id);

    return ApiResponse.success<UserEntity>({
      data: user,
    });
  }

  @Post('/')
  async create(@Body() createUserDTO: CreateUserDTO): Promise<ApiResponse<UserEntity>> {
    const user = await this.userService.create(createUserDTO);

    return ApiResponse.success<UserEntity>({
      statusCode: HttpStatus.CREATED,
      message: 'User created!',
      data: user,
    });
  }

  @Patch(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() updateUserDTO: UpdateUserDTO): Promise<ApiResponse<UserEntity>> {
    const user = await this.userService.update(id, updateUserDTO);

    return ApiResponse.success<UserEntity>({
      message: 'User updated!',
      data: user,
    });
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number): Promise<ApiResponse<UserEntity>> {
    await this.userService.delete(id);

    return ApiResponse.success<UserEntity>({
      message: 'User deleted!',
    });
  }

  @Delete('/soft/:id')
  async softDelete(@Param('id', ParseIntPipe) id: number): Promise<ApiResponse<UserEntity>> {
    await this.userService.softDelete(id);

    return ApiResponse.success<UserEntity>({
      message: 'User soft deleted successfully!',
    });
  }

  @Post('/restore/:id')
  async restoreDeletedRecord(@Param('id', ParseIntPipe) id: number): Promise<ApiResponse<UserEntity>> {
    await this.userService.restoreSoftDelete(id);

    return ApiResponse.success<UserEntity>({
      message: 'User restored!',
    });
  }
}
