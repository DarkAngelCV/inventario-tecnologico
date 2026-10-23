
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module.js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Permitir la comunicación con Vue.js
  app.enableCors({
    origin: 'http://localhost:5173',
  });

  // Validar los datos recibidos por la API
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  await app.listen(process.env.PORT ?? 3000);

  console.log('Servidor iniciado en http://localhost:3000');
}

bootstrap();
