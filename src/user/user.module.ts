import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Achievment } from 'src/achievment/entities/achievment.entity';
import { Game } from 'src/game/entites/game.entity';
import { GameState } from 'src/gamestate/entities/gamestate.entity';
import { Message } from 'src/message/entities/message.entity';
import { Room } from 'src/room/entities/room.entity';
import { UserToRoom } from 'src/room/entities/userToRoom.entity';
import { User } from './entities/user.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Achievment, Game, Room, GameState, UserToRoom, Message])],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService]
})
export class UserModule {}
