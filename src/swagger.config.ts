import { DocumentBuilder } from '@nestjs/swagger';

export const swaggerOptions = new DocumentBuilder()
  .setTitle('My API')
  .setDescription('API description')
  .setVersion('1.0')
  .addTag('users')
  .addTag('reports')
  .build();
