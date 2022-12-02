import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { JWTGuard } from './auth/guards/jwt.guard';
import { SocketIoAdapter } from './messages/socket-io-adapter';
import * as cookieParser from 'cookie-parser';
import * as bodyParser from 'body-parser';
import { UserService } from './user/user.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: 'http://localhost:3001',
      credentials: true,
    }
  });
  const configService = app.get(ConfigService);
//   const userService = app.get(UserService);
  app.useWebSocketAdapter(new SocketIoAdapter(app, configService))
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    transform: true
  }));
  app.use(cookieParser());
  app.use(bodyParser.json({limit: '50mb'}));
  app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
  const config = new DocumentBuilder()
                    .setTitle('Pong API Docs')
                    .setDescription('This is the documentation of Pong API')
                    .setVersion('1.0')
                    .addTag('Pong')
                    .addBearerAuth()
                    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);
  await app.listen(parseInt(configService.get('PORT')));
}
bootstrap();
