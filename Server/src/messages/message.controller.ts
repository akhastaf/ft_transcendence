import { Body, Controller, Get, Param, ParseIntPipe, Req, UseGuards } from '@nestjs/common';
import { messageModel, RequestWithUser } from 'src/types';
import { GroupsService } from './groups.service';
import { MessagesService } from './messages.service';
import { channelModel } from 'src/types';
import { conditionalExpression } from '@babel/types';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JWTGuard } from 'src/auth/guards/jwt.guard';

@ApiTags('Channels')
@ApiBearerAuth()
@UseGuards(JWTGuard)
@Controller('channels')
export class MessagesController {
  constructor(
		private readonly messagesService: MessagesService,
		private readonly groupsService: GroupsService
	) {}


	//!Normalement hna 5asni na5oud id man Req
	//TODO: YOU SHOULD GET THE ID FROM THE TOKEN/COOKIE/REQ : to improve
	@Get('dms')// Normalement ghana5oud id man rq
	async	getDmByUser(@Req() req: RequestWithUser)
	{
		console.log("###### getDmByUser ########", req);
		let arr = new Array();
		const dms = await this.groupsService.getDmByUser(req.user.id);
		if (dms){
			dms.forEach(element => {
				let dm = new channelModel();
				dm.id = element.group.id;
				dm.name = element.group.name;
				dm.avatar = element.group.avatar;
				dm.privacy = element.group.privacy;
				arr.push(dm);
				console.log("======= dm =======", dm);
			});
			return arr;
		}
		return null;
	}

	@Get('rooms')// Normalement ghana5oud id man rq
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

	@Get('dms/messages/:id')// id -> id_room , id2 -> id_user
	async getDmMessages(@Req() req: RequestWithUser, @Param('id', ParseIntPipe) id: number) {
		console.log("##########  getDmMessages  ##########", id);
		let arr = new Array();
		const messages = await this.messagesService.getDmMessages(id);//id here is the id of the group
		if (messages)
		{
			messages.forEach(element => {
				let message = new messageModel();
				message.message = element.content;
				message.userId = element.sender.id;
				message.userName = element.sender.username;
				message.date = element.createdAt;
				message.currentUser = element.sender.id == req.user.id ? true : false;
				arr.push(message);
				// console.log("channel",element);
			});
				// console.log("channel",channels);
			return arr;
		}
		return null;
	}

	@Get('rooms/messages/:id')
	async getRoomMessages(@Req() req: RequestWithUser, @Param('id', ParseIntPipe) id: number) {
		console.log("##########  getRoomMessages  ##########", id);
		let arr = new Array();
		const messages = await this.messagesService.getRoomMessages(id);//id here is the id of the group
		if (messages)
		{
			messages.forEach(element => {
				let message = new messageModel();
				message.message = element.content;
				message.userId = element.sender.id;
				message.userName = element.sender.username;
				message.date = element.createdAt;
				message.currentUser = element.sender.id == req.user.id ? true : false;
				message.avatar = element.sender.avatar;
				arr.push(message);
				// console.log("channel",element);
			});
				// console.log("channel",channels);
			return arr;
		}
		return null;
	}

}
