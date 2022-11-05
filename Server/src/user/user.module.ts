import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Achievment } from 'src/achievment/entities/achievment.entity';
import { JWTGuard } from 'src/auth/guards/jwt.guard';
import { Game } from 'src/game/entites/game.entity';
import { GameState } from 'src/gamestate/entities/gamestate.entity';
import { Message } from 'src/messages/entities/message.entity';
import { User } from './entities/user.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Achievment, Game, GameState, Message])],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService]
})
export class UserModule {}
