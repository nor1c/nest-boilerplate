import { DeleteResult } from 'typeorm';
import { CreateUserDTO } from '../dtos/create-user.dto';
import { UpdateUserDTO } from '../dtos/update-user.dto';

export interface UserServiceInterface<T> {
  findAll(): Promise<T[]>;
  findById(id: number): Promise<T>;
  create(createUserDto: CreateUserDTO): Promise<T>;
  update(id: number, updateUserDTO: UpdateUserDTO): Promise<T>;
  delete(id: number): Promise<DeleteResult>;
  softDelete(id: number): Promise<DeleteResult>;
  restoreSoftDelete(id: number): Promise<T>;
}
