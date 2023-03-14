import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://jayanthbrahmanapelly:your_password@cluster0.1swlcjv.mongodb.net/nestjsdemo',
    ),
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  static configureSwagger(app) {
    const options = new DocumentBuilder()
      .setTitle('Users Demo')
      .setDescription('API description users')
      .setVersion('1.0')
      .addTag('users')
      .addBearerAuth()
      .build();

    const document = SwaggerModule.createDocument(app, options);

    SwaggerModule.setup('api', app, document);
  }
}
