import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as express from 'express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const server = express();
  const app = await NestFactory.create(
    AppModule,
    new ExpressAdapter(server),
  );

  const options = new DocumentBuilder()
  .setTitle('Your API')
  .setDescription('API description')
  .setVersion('1.0')
  .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  // Set CORS headers
  app.enableCors({
    origin: 'http://localhost:3000',
    methods: 'GET, POST, PUT, DELETE',
    allowedHeaders: 'Content-Type',
  });

  const PORT = process.env.PORT || 5000;
  await app.listen(PORT, () =>
    console.log(`Server started on port ${PORT}`),
  );
}

bootstrap();