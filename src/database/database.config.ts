import { envAsBoolean, envAsNumber, envAsString } from '@core/helpers';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export class DatabaseConfig {
  public static dbConf: TypeOrmModuleOptions = {
    host: envAsString('DB_HOST'),
    port: envAsNumber('DB_PORT'),
    username: envAsString('DB_USERNAME'),
    password: envAsString('DB_PASSWORD'),
    database: envAsString('DB_NAME'),
    synchronize: envAsBoolean('DB_SYNC'),
    logging: true,
  };
}
