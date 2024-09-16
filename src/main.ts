import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS
  app.enableCors({
    origin: 'http://localhost:3001',  // Allow requests from teh frontend (adjust the port if needed)
    credentials: true,  // Allow credentials such as cookies or authorization headers
  });

  await app.listen(3000);
}
bootstrap();
