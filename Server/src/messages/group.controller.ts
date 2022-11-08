import { Body, Controller, Get, Param, ParseIntPipe, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JWTGuard } from 'src/auth/guards/jwt.guard';
import { channelModel, memberModel, RequestWithUser } from 'src/types';
import { CreateGroupDto } from './dto/create-group.dto';
import { GroupsService } from './groups.service';
import { MessagesService } from './messages.service';

@ApiTags('Channels')
@ApiBearerAuth()
@UseGuards(JWTGuard)
@Controller('channels')
export class GroupController {
  constructor(
		private readonly groupsService: GroupsService
	) {}

	@Get()//* get all channels
	async getChannelByUserId(@Req() req: RequestWithUser) {
		//* Group msg;
		//* Group users;
		// console.log("##########  getChannelById  ##########", id);
		// console.log(req);
		let arr = new Array();
		const channels = await this.groupsService.getChannelByUser(req.user.id);
		if (channels)
		{
			channels.forEach(element => {
				let channel = new channelModel();
				channel.id = element.group.id;
				channel.name = element.group.name;
				channel.privacy = element.group.privacy;
				channel.avatar = element.group.avatar;
				arr.push(channel);
				// console.log("channel",element);
			});
				// console.log("channel",channels);
			return arr;
		}
		return null;
	}
	// *** 1- getMembers *********//
	//! the function bellow wasn t tested yet .p
	@Get('members/:id')
	async getMembers(@Req() req: RequestWithUser, @Param('id', ParseIntPipe) id: number) {
		let arr = new Array();
		const members = await this.groupsService.getMemberByChannel(id, req.user.id); //* id => id_group
		if (members)
		{
			members.forEach(element => {
				let member = new memberModel();
				member.id = element.user.id;
				member.name = element.user.username;
				member.avatar = element.user.avatar;
				member.status = element.user.status;
				arr.push(member);
			});
		}
	}

	@Post()//* create channel
	async createChannel(@Req() req: RequestWithUser, @Body() body: CreateGroupDto) {
		const group = await this.groupsService.createGroup(req.user, body);
		const channel = new channelModel();
		channel.id = group.id;
		channel.name = group.name;
		channel.privacy = group.privacy;
		channel.avatar = group.avatar;
		return channel;
	}
  }
