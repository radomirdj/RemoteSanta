import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Median')
    .setDescription('The Median API description')
    .setVersion('0.1')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  if (process.env.ENABLE_ALL_CORS) app.enableCors();
  await app.listen(process.env.PORT);
  console.log(
    'bootstrap -> process.env.PORT',
    process.env.PORT,
    process.env.NODE_ENV,
  );
}
bootstrap();
