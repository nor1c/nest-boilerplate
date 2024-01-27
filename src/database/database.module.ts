import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseConfig } from './database.config';

@Module({
  imports: [TypeOrmModule.forRoot(DatabaseConfig.dbConf)],
})
export class DatabaseModule {}
