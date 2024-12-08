import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { Logger, ValidationPipe } from '@nestjs/common'
import cookieParser from 'cookie-parser'
import express from 'express'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import passport from 'passport'
import path from 'path'

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  })

  const logger = new Logger()

  app.enableCors({
    origin: ['http://localhost:54321', 'http://localhost:54322'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS', 'HEAD'],
    credentials: true,
    exposedHeaders: ['Content-Disposition'],
  })
  app.useGlobalPipes(new ValidationPipe())
  app.use(cookieParser())
  app.use(passport.initialize())
  // Setup to display files
  app.use('/files', express.static(path.join(__dirname, 'files')))

  // Setup Swagger
  const config = new DocumentBuilder()
    .setTitle('.md Notes API')
    .setDescription('This is an API for .md Notes app.')
    .setVersion('1.0.0')
    .build()

  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('/', app, document)

  const PORT = process.env.PORT || 3000
  await app.listen(PORT)

  logger.log(`App is listening on: ${await app.getUrl()}`)
}
bootstrap()
