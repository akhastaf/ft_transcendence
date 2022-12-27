import { Module } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { MessagesGateway } from './messages.gateway';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Message } from './entities/message.entity';
import { Group } from './entities/group.entity';
import { UserToGroup } from './entities/usertogroup.entity';
import { GroupsService } from './groups.service';
import { MessagesController } from './message.controller';
import { User } from 'src/user/entities/user.entity';
import { GroupController } from './group.controller';
import { GameMode } from 'src/game/entites/game.entity';
import { GameModule } from 'src/game/game.module';

@Module({
	imports: [
		TypeOrmModule.forFeature([
			User,
			Message,
			Group,
			UserToGroup
		]),
		GameModule
	],
	providers: [
		MessagesGateway,
		MessagesService,
		GroupsService
	],
	controllers: [MessagesController, GroupController],
	// exports: [MessagesService]
})
export class MessagesModule {}
