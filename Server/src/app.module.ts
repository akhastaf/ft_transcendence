import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmAsyncConfig } from './config/typeorm.config';
import { DataSource } from 'typeorm';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { AchievmentModule } from './achievment/achievment.module';
import { GameModule } from './game/game.module';
import { RoomModule } from './room/room.module';
import { ChatModule } from './chat/chat.module';
import { CaslModule } from './casl/casl.module';
import { RoomGateway } from './room/room.gateway';
import { MessageModule } from './message/message.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync(typeOrmAsyncConfig),
    AuthModule,
    UserModule,
    AchievmentModule,
    GameModule,
    RoomModule,
    ChatModule,
    CaslModule,
    MessageModule,
   ],
  controllers: [],
  providers: [],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
