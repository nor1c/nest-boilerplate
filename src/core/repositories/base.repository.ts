import { HttpException, HttpStatus, NotFoundException } from '@nestjs/common';
import { DeepPartial, DeleteResult, FindManyOptions, FindOneOptions, Repository, UpdateResult } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { BaseRepositoryInterface } from './base.repository.interface';

export class BaseRepository<T> implements BaseRepositoryInterface<T> {
  protected constructor(private readonly repository: Repository<T>) {}

  private async checkTargetRecord(id: number, withDeleted: boolean = false): Promise<void> {
    const target = await this.findById(id, withDeleted);

    if (!target) {
      throw new NotFoundException('The data to be updated was not found, please enter a valid ID.');
    }
  }

  async create(data: DeepPartial<T>): Promise<T> {
    const entity = this.repository.create(data);
    return await this.repository.save(entity);
  }

  async findAll(options?: FindManyOptions<T>): Promise<T[]> {
    return await this.repository.find(options);
  }

  async findById(id: any, withDeleted: boolean = false): Promise<T> {
    const options: FindOneOptions = {
      where: {
        id,
      },
      withDeleted,
    };

    return await this.repository.findOne(options);
  }

  async findByConditions(conditions?: FindOneOptions): Promise<T> {
    return await this.repository.findOne(conditions);
  }

  async updateById(id: number, data: QueryDeepPartialEntity<T>): Promise<UpdateResult> {
    await this.checkTargetRecord(id);

    return await this.repository.update(id, data);
  }

  async delete(id: number): Promise<DeleteResult> {
    await this.checkTargetRecord(id);

    return await this.repository.delete(id);
  }

  async softDeleteById(id: number): Promise<DeleteResult> {
    return await this.repository.softDelete(id);
  }

  async restoreDeletedRecord(id: number): Promise<T> {
    await this.checkTargetRecord(id, true);

    const restoreResult = await this.repository.restore(id);
    if (!restoreResult.affected) {
      throw new HttpException('Failed to restore record.', HttpStatus.INTERNAL_SERVER_ERROR);
    }

    return await this.findById(id);
  }
}
