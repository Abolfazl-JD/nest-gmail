import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common'
import { DataSource } from 'typeorm';
import * as session from 'express-session'
import { TypeormStore } from 'connect-typeorm'
import { SessionEntity } from './session.entity';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }))

  const sessionRepository = app.get(DataSource).getRepository(SessionEntity)
  app.use(session({
    name : 'Gmail_session_id',
    secret: '876reqjy6r876r6lt82r36a',
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge : 60000 
    },
    store: new TypeormStore({
      cleanupLimit : 10
    }).connect(sessionRepository)
  }))

  await app.listen(3000);
}
bootstrap();
