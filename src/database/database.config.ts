import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export class DatabaseConfig {
  public static config(configService: ConfigService): TypeOrmModuleOptions {
    return {
      type: 'mariadb',
      host: configService.get('DB_HOST', { infer: true }),
      port: configService.get('DB_PORT', { infer: true }),
      username: configService.get('DB_USERNAME', { infer: true }),
      password: configService.get('DB_PASSWORD', { infer: true }),
      database: configService.get('DB_NAME', { infer: true }),
      synchronize: configService.get('DB_SYNC', { infer: true }) || false,
      logging: false,
      autoLoadEntities: true,
      migrations: [],
    };
  }
}
