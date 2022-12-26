import { Body, Controller, Get, Param, ParseIntPipe, Req, UseGuards } from '@nestjs/common';
import { memberModel, messageModel, RequestWithUser } from 'src/types';
import { GroupsService } from './groups.service';
import { MessagesService } from './messages.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JWTGuard } from 'src/auth/guards/jwt.guard';

@ApiTags('Messages')
@ApiBearerAuth()
@UseGuards(JWTGuard)
@Controller('messages')
export class MessagesController {
  constructor(
		private readonly messagesService: MessagesService,
		private readonly groupsService: GroupsService
	) {}

	@Get()//* get all dms
	async	getDmByUser(@Req() req: RequestWithUser)
	{
		// console.log("###### getDmByUser ########", req);
		let arr = new Array();
		const dms = await this.groupsService.getDmByUser(req.user.id);
		if (dms){
			dms.forEach(element => {
				let dm = new memberModel();
				dm.id = element.group.id;
				dm.name = element.group.name;
				dm.avatar = element.group.avatar;
				dm.status = element.user.status;
				arr.push(dm);
				// console.log("======= dm =======", dm);
			});
			return arr;
		}
		return null;
	}

	@Get(':id')//* get messages of a dm
	async getDmMessages(@Req() req: RequestWithUser, @Param('id', ParseIntPipe) id: number) {
		// console.log("##########  getDmMessages  ##########", id);
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
				message.avatar = element.sender.avatar;
				arr.push(message);
				// console.log("channel",element);
			});
				// console.log("channel",channels);
			return arr;
		}
		return null;
	}
//TODO : check if the user is blocked by the receiver
	@Get('rooms/:id') //* get messages of a room
	async getRoomMessages(@Req() req: RequestWithUser, @Param('id', ParseIntPipe) id: number) {
		// console.log("##########  getRoomMessages  ##########", id);
		//! hna i should check if the user is allowed to the msgs.
		//* if the  room is public => ok
		// * otherwise => check if the user is in the room
		//* if so you should check if he is not banned
		const is_allowed = await this.groupsService.isAllowedR(req.user.id, id);
		if (!is_allowed)
			return null;
		const messages = await this.messagesService.getRoomMessages(id);//id here is the id of the group
		const blocked_list = await this.groupsService.getBockedUser(req.user.id);
		if (messages)
		{
			//* list of users who blocked the current user
			// const blocked_by = await this.groupsService.getblockerlist(req.user.id, id);
			let arr = new Array();
			messages.forEach(async element => {
				//* if the sender is in the list of users who blocked the current user => skip
				// if (blocked_by && blocked_by.includes(element.sender.id))
				// 	return;
				let is_blocked: boolean = false;
				for (const blocked of blocked_list)
				{
					if (blocked.id == element.sender.id)
					{
						is_blocked = true;
						break;
					}
				}
				if (is_blocked)
					return;
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
