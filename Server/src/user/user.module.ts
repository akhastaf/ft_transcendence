import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AchievmentModule } from 'src/achievment/achievment.module';
import { Achievment } from 'src/achievment/entities/achievment.entity';
import { Game } from 'src/game/entites/game.entity';
import { Message } from 'src/messages/entities/message.entity';
import { User } from './entities/user.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Achievment, Game, Message]), AchievmentModule],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService]
})
export class UserModule {}
