import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('nest example')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);

  app.enableCors();
  // You can add object in enableCors:
  // {
  //           origin: true, <-- or array with urls
  //           methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  //           credentials: true,
  // }

  await app.listen(3000);
}
bootstrap();
