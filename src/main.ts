import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {ValidationPipe} from '@nestjs/common'

async function bootstrap() {
  const app = await NestFactory.create(AppModule); //vai fabricar o módulo inicial da aplicação e gerar a instância
  
  app.useGlobalPipes(new ValidationPipe())

  await app.listen(3000);
}
bootstrap();
