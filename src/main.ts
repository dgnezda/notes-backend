import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import cookieParser from 'cookie-parser'
import express from 'express'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });

  const logger = new Logger();

  app.enableCors({
    origin: ['http://localhost:3000', 'http://localhost:3001', 'http://localhost:5173'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS', 'HEAD'],
    credentials: true,
  });
  app.useGlobalPipes(new ValidationPipe())
  app.use(cookieParser())
  // Setup to display files
  app.use('/files', express.static('files'))

  // Setup Swagger
  const config = new DocumentBuilder()
    .setTitle('Auction hub (ahub) API')
    .setDescription('This is an API for Auction hub (ahub).')
    .setVersion('1.0.0')
    .build()

  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('/', app, document)

  const PORT = process.env.PORT || 8080
  await app.listen(PORT)

  logger.log(`App is listening on: ${await app.getUrl()}`)
}
bootstrap();
