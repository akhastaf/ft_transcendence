import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Req, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { JWTGuard } from 'src/auth/guards/jwt.guard';
import { channelModel, memberModel, RequestWithUser } from 'src/types';
import { SharpPipe } from 'src/user/pipes/sharp.pipe';
import { addUserDto } from './dto/add-user.dto';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { passwordDto, updatePasswordDto } from './dto/update-pwd.dto';
import { setStatusDto, unsetStatusDto } from './dto/update-status.dto';
import { Group } from './entities/group.entity';
import { GroupsService } from './groups.service';
import { MessagesService } from './messages.service';

@ApiTags('Channels')
@ApiBearerAuth()
@UseGuards(JWTGuard)
@Controller('channels')
export class GroupController {
  constructor(
		private readonly groupsService: GroupsService,
		private readonly configService: ConfigService
	) {}

	@Post()//* create channel
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                name : {
                    type: 'string',
                    format: 'string'
                },
                avatar: {
                    type: 'string',
                    format: 'binary'
                },
                password: {
                    type: 'string',
                    format: 'string'
                },
				description: {
					type: 'string',
					format: 'string'
				},
				privacy: {
					type: 'string',
					format: 'string'
				}
            },
        },
    })
    @UseInterceptors(FileInterceptor('avatar'))
	async createChannel(
		@Req() req: RequestWithUser,
		@Body() body: CreateGroupDto,
        @UploadedFile(SharpPipe) avatar: string)
	{
		console.log("##########  createChannel  ##########", req.user.id);
		console.log("body", body);
		if (avatar)
			body.avatar = this.configService.get('SERVER_HOST') + avatar;
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
				member.role = element.role;
				member.action = element.status;
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
	@Post('set-admin')
	async setAdmin(@Req() req: RequestWithUser, @Body() data: addUserDto) {
		console.log("setAdmin", data);
		return await this.groupsService.setAdmin(req.user.id, data);
	}
	//* Unset admin role
	@Post('unset-admin')
	async unsetAdmin(@Req() req: RequestWithUser, @Body() data: addUserDto) {
		console.log("unsetAdmin", data);
		return await this.groupsService.unsetAdmin(req.user.id, data);
	}

	@Post('set-status')
	async setStatus(@Req() req: RequestWithUser, @Body() data: setStatusDto) {
		console.log("setStatus", data);
		return await this.groupsService.setStatus(req.user.id, data);
	}

	@Post('unset-status')
	async unsetStatus(@Req() req: RequestWithUser, @Body() data: unsetStatusDto) {
		console.log("setStatus", data);
		return await this.groupsService.unsetStatus(req.user.id, data);
	}

	@Post('password')
	async setPassword(@Req() req: RequestWithUser, @Body() data: passwordDto) {
		console.log("setPassword", data);
		return await this.groupsService.setPwd(req.user.id, data);
	}

	@Patch('password')
	async updatePassword(@Req() req: RequestWithUser, @Body() data: updatePasswordDto) {
		console.log("updatePassword", data);
		return await this.groupsService.updatePwd(req.user.id, data);
	}

	@Delete('password')
	async deletePassword(@Req() req: RequestWithUser, @Body() data: passwordDto) {
		console.log("deletePassword", data);
		return await this.groupsService.deletePwd(req.user.id, data);
	}

	@Delete(':id')
	async deleteChannel(@Req() req: RequestWithUser, @Param('id', ParseIntPipe) id: number) {
		console.log("deleteChannel", id);
		return await this.groupsService.deleteGroup(req.user.id, id);
	}
	@Patch()
	async updateChannel(@Req() req: RequestWithUser, @Body() data: UpdateGroupDto) {
		console.log("updateChannel : ", data);
		return await this.groupsService.updateGroup(req.user.id, data);
	}

  }
