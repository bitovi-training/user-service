import { NestFactory } from '@nestjs/core';
import { ValidationPipe, Logger } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const logger = new Logger('Bootstrap');
  const app = await NestFactory.create(AppModule);

  // Enable validation globally
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // Enable CORS for development
  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  const port = process.env.PORT || 3002;
  await app.listen(port);

  logger.log(`🚀 User Service is running on: http://localhost:${port}`);
  logger.log(`📝 Health check available at: http://localhost:${port}/health`);
  logger.log(`🔐 Auth endpoints: http://localhost:${port}/auth/signup, /auth/signin, /auth/logout`);
}

bootstrap();
