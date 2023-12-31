import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ClassSerializerInterceptor } from '@nestjs/common';
import { SwaggerModule } from '@nestjs/swagger';
import { PUBLIC_DOCUMENT } from './documents';

const PORT = process.env.PORT || 5000

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: true
  });

  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)))

  SwaggerModule.setup('docs', app, PUBLIC_DOCUMENT(app))
  
  await app.listen(PORT);
}
bootstrap();
