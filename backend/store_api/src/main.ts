import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { UseInterceptors, ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './common/api/http-exception.filter';
import { TransformInterceptor } from './common/api/transform.interceptor';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalInterceptors(new TransformInterceptor());
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  const config = new DocumentBuilder()
    .setTitle('copang store api')
    .setDescription('copang 프로젝트 stroe api 입니다.')
    .setVersion('2.0')
    .addBearerAuth({ type: 'http', scheme: 'bearer', bearerFormat: 'JWT' }, 'access-token')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);

  await app.listen(5000);
}
bootstrap();
