import { DeepPartial, DeleteResult, FindManyOptions, FindOneOptions, UpdateResult } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

export interface BaseRepositoryInterface<T> {
  create(data: DeepPartial<T>): Promise<T>;
  findAll(options?: FindManyOptions<T>): Promise<T[]>;
  findById(id: any): Promise<T>;
  findByConditions(conditions?: FindOneOptions<T>): Promise<T>;
  updateById(id: number, data: QueryDeepPartialEntity<T>): Promise<UpdateResult>;
  delete(id: number): Promise<DeleteResult>;
  softDeleteById(id: number): Promise<DeleteResult>;
  restoreDeletedRecord(id: number): Promise<T>;
}
