import { BaseRepositoryInterface } from '@/core/repositories/base.repository.interface';
import { UserEntity } from '../entities/user.entity';

export type UserRepositoryInterface = BaseRepositoryInterface<UserEntity>;
