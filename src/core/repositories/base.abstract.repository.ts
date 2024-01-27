import { DeepPartial, DeleteResult, Repository, UpdateResult } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

export abstract class BaseAbstractRepository<T> {
  private entity: Repository<T>;

  constructor(entity: Repository<T>) {
    this.entity = entity;
  }

  public async create(data: DeepPartial<T>): Promise<T> {
    return await this.entity.save(data);
  }

  public async update(id: number | string, data: QueryDeepPartialEntity<T>): Promise<UpdateResult> {
    return await this.entity.update(id, data);
  }

  public async delete(id: number | string): Promise<DeleteResult> {
    return await this.entity.delete(id);
  }

  public async softDelete(id: number | string): Promise<DeleteResult> {
    return await this.entity.softDelete(id);
  }
}
