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

	@Post()//* create channel
	async createChannel(@Req() req: RequestWithUser, @Body() body: CreateGroupDto) {
		console.log("##########  createChannel  ##########", req.user.id);
		console.log("body", body);
		const group = await this.groupsService.createGroup(req.user, body);
		const channel = new channelModel();
		channel.id = group.id;
		channel.name = group.name;
		channel.privacy = group.privacy;
		channel.avatar = group.avatar;
		channel.description = group.description;
		return channel;
	}

	@Get()//* get joined channels
	async getChannelByUserId(@Req() req: RequestWithUser) {
		//* Group msg;
		//* Group users;
		// console.log("##########  getChannelById  ##########", req.user.id);
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
				channel.description = element.group.description;
				arr.push(channel);
				// console.log("channel",element);
			});
				// console.log("groups",arr);
		}
		return arr;
	}

	@Get('guild-discovery')//* get public and protected channels
	async getChannels(@Req() req: RequestWithUser) {
		const channels = await this.groupsService.getGroups();
		return channels;
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
		return arr;
	}

	//* get blocked users
	@Get('blocked-users')
	async getBlockedUsers(@Req() req: RequestWithUser) {
		return await this.groupsService.getBockedUser(req.user.id);
	}

	@Get('friend-users')
	async getFriendsUser(@Req() req: RequestWithUser) {
		return await this.groupsService.getFriendsUser(req.user.id);
	}

	//* Get user role by channel
	@Get('role/:id')
	async getRole(@Req() req: RequestWithUser, @Param('id', ParseIntPipe) id_group: number) {
		return await this.groupsService.getUserRole(req.user.id, id_group);
	}

	//* Set admin role
	@Post('set-admin/:id')
	async setAdmin(@Req() req: RequestWithUser, @Param('id', ParseIntPipe) id_group: number) {
		return await this.groupsService.setAdmin(req.user.id, id_group);
	}
  }
