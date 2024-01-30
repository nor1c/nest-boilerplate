import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { log } from 'console';
import helmet from 'helmet';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // core middlewares
  app.enableCors();
  app.use(helmet());

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );

  // swagger
  const documentOptions = new DocumentBuilder().setTitle('NestJS Boilerplate API Documentation').setDescription('The documentation of NestJS Boilerplate API.').setVersion('1.0').build();
  const document = SwaggerModule.createDocument(app, documentOptions);
  SwaggerModule.setup('docs', app, document);

  const port: number = 3000;
  await app.listen(port, '0.0.0.0', () => log(`App running on port ${port}`));
}
bootstrap();
