import { NestFactory } from '@nestjs/core';
import { ValidationError as NestValidationError } from '@nestjs/common';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as morgan from 'morgan'

import { AppModule } from './app.module';
import {ResponseTransformInterceptor} from "@/base/middleware/response.interceptor";
import {ValidationPipe} from "@nestjs/common";
import {ValidationError} from "@/base/api/exception.reslover";
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";
import {HttpExceptionFilter} from "@/base/middleware/http-exception.filter";
import {UnknownExceptionsFilter} from "@/base/middleware/unknown-exceptions.filter";
import {LoggingService} from "@/base/logging";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
    const loggingService = app.get(LoggingService);
    const logger = loggingService.getLogger();

  app.enableCors()
  app.use(`/uploads`, express.static('/uploads'));
  app.use(bodyParser.json({ limit: '10mb' }));
  app.use(morgan('dev'))

  app.useGlobalInterceptors(new ResponseTransformInterceptor());
  app.useGlobalFilters(new UnknownExceptionsFilter(loggingService));
  app.useGlobalFilters(new HttpExceptionFilter(loggingService));

  app.useGlobalPipes(
      new ValidationPipe({
        exceptionFactory: (validationErrors: NestValidationError[] = []) => new ValidationError(validationErrors),
        whitelist: true,
        forbidNonWhitelisted: true,
      }),
  );
    const config = new DocumentBuilder()
        .setTitle('Cats example')
        .setDescription('The cats API description')
        .setVersion('1.0')
        .addServer('http://localhost:7000', 'local')
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);
  await app.listen(7000);
}
bootstrap();
