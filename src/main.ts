import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
// import { HttpExceptionFilter } from './common/utils/exception/exception.filter';
import { PrismaClientExceptionFilter } from './common/utils/exception/prisma.filter';
import { AllExceptionsFilter } from './common/utils/exception/allException.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(
    new PrismaClientExceptionFilter(httpAdapter),
    // new HttpExceptionFilter(),
    new AllExceptionsFilter(),
  );
  app.use(cookieParser());
  app.setGlobalPrefix('api');
  const config = new DocumentBuilder()
    .setTitle('Youtube Music')
    .setDescription('The Youtube Music API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);

  await app.listen(8080);
}
bootstrap();
