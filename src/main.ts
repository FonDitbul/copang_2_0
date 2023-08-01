import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { UseInterceptors, ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './common/api/http-exception.filter';
import { TransformInterceptor } from './common/api/transform.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalInterceptors(new TransformInterceptor());
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  await app.listen(3000);
}
bootstrap();
