import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import helmet from 'helmet';
import { GlobalExceptionFilter } from './shared/infrastructure/filters/global-exception.filter';
import { CustomValidationPipe } from './shared/infrastructure/pipes/validation.pipe';
import { ResponseInterceptor } from './shared/infrastructure/interceptors/response.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);

  app.use(helmet());

  app.useGlobalFilters(new GlobalExceptionFilter());
  app.useGlobalInterceptors(new ResponseInterceptor());
  app.useGlobalPipes(new CustomValidationPipe());

  // CORS
  app.enableCors({
    origin: configService.get('FRONTEND_URL'),
    credentials: true,
  });

  // Swagger
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Task App API')
    .setDescription('API documentation for Task App')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document);

  const port = configService.get('PORT') || 3001;

  await app.listen(port);
  console.log(`🚀 Application is running on: http://localhost:${port}`);
  console.log(`📊 Health check available at: http://localhost:${port}/health`);
  console.log(`📘 Swagger docs available at: http://localhost:${port}/api`);
}

bootstrap();