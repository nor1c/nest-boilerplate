import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { CreateUserDTO } from './dtos/create-user.dto';
import { UpdateUserDTO } from './dtos/update-user.dto';
import { UserEntity } from './entities/user.entity';
import { UserRepositoryInterface } from './interfaces/user.repository.interface';
import { UserServiceInterface } from './interfaces/user.service.interface';
import { UserToken } from './tokens/user.token';

@Injectable()
export class UserService implements UserServiceInterface<UserEntity> {
  constructor(
    @Inject(UserToken.UserRepositoryInterface.description)
    private readonly userRepository: UserRepositoryInterface,

    @InjectRepository(UserEntity)
    private userEntity: Repository<UserEntity>,
  ) {}

  async findAll(): Promise<UserEntity[]> {
    try {
      return await this.userRepository.findAll();
    } catch (error) {
      throw error;
    }
  }

  async findById(id: number): Promise<UserEntity> {
    try {
      return await this.userRepository.findById(id);
    } catch (error) {
      throw error;
    }
  }

  async create(createUserDto: CreateUserDTO): Promise<UserEntity> {
    try {
      return await this.userRepository.create(createUserDto);
    } catch (error) {
      throw error;
    }
  }

  async update(id: number, updateUserDTO: UpdateUserDTO): Promise<UserEntity> {
    try {
      await this.userRepository.updateById(id, updateUserDTO);

      return await this.userRepository.findById(id);
    } catch (error) {
      throw error;
    }
  }

  async delete(id: number): Promise<DeleteResult> {
    try {
      return await this.userRepository.delete(id);
    } catch (error) {
      throw error;
    }
  }

  async softDelete(id: number): Promise<DeleteResult> {
    try {
      return await this.userRepository.softDeleteById(id);
    } catch (error) {
      throw error;
    }
  }

  async restoreSoftDelete(id: number): Promise<UserEntity> {
    try {
      return await this.userRepository.restoreDeletedRecord(id);
    } catch (error) {
      throw error;
    }
  }
}
