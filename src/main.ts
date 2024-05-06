if (!process.env.IS_TS_NODE) {
  require('module-alias/register');
}

import { NestFactory } from '@nestjs/core';
import { AppModule } from '@app/app.module';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT');

  const allowedDomains = ['https://musait.tech', 'http://localhost:3000/'];

  app.enableCors({
    origin: function (origin, callback) {
      if (!origin || allowedDomains.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not Allowed by CORS'));
      }
    },
  });

  const configSwagger = new DocumentBuilder()
    .setTitle('Musait API example')
    .setDescription('The Musait API documentation')
    .addBearerAuth({
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
      name: 'Authorization',
      description: 'Enter token',
      in: 'header',
    })
    .build();

  const document = SwaggerModule.createDocument(app, configSwagger);
  SwaggerModule.setup('docs', app, document);

  await app.listen(port);
}
bootstrap();
