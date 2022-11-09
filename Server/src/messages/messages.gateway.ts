import { WebSocketGateway, SubscribeMessage, MessageBody, WebSocketServer, ConnectedSocket } from '@nestjs/websockets';
import { MessagesService } from './messages.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { Server, Socket } from 'socket.io';
import { CreateGroupDto } from './dto/create-group.dto';
import { GroupsService } from './groups.service';
import { CreateUserToGroup } from './dto/create-user-to-group.dto';
import { RemoveUserToGroup } from './dto/remove-user-to-group.dto';
import { memberModel, messageModel, SocketWithUserId } from 'src/types';
import { joinGroupDto } from './dto/join-group.dto';
import { Userstatus } from 'src/user/entities/user.entity';

@WebSocketGateway({
	cors: {
		origin: '*',
		// origin: 'http://localhost:3000',	// Allow only this origin	
		// credentials: true,	// Allow cookies
	}
})

//* ###################################################  Messages  ########################################################

	//*** 1- createMessage   *******//
	//*** 2- findAllMessages *******//
	//*** 2- typing *******//

export class MessagesGateway {

	@WebSocketServer()
	server: Server; // Is a refrence to the socket.io server under the hood //* A reference to the underlying Engine.IO server.
	constructor(
		private readonly messagesService: MessagesService,
		private readonly groupsService: GroupsService) { }
		
	connectedList =	new Set<number>();

	@SubscribeMessage('sendMessage')
	async sendMessage(@MessageBody() createMessageDto: CreateMessageDto, @ConnectedSocket() client: Socket) {
		//! you can send a message to a group only if you are in it
		const is_allowed = await this.groupsService.isGroupMember(client.data.id, createMessageDto.receiver_id);
		if (!is_allowed)
		{
			console.log("You are not allowed to send a message to this group");
			return ; //! Should I send an error message ?
		}
		const message = await this.messagesService.sendMessage(createMessageDto, client.data.id);
		const members = await this.groupsService.getMemberByChannel(createMessageDto.receiver_id, client.data.id);
		//* send to all users in the room
		for (const member of members) {
			// Le message ne doit pas etre envoyé au client qui l'a envoyé: should be done by front ;[]
			// console.log('Halima da5lat', member.user.id, this.connectedList.has(member.user.id), this.connectedList);
			if (client.data.id != member.user.id && this.connectedList.has(member.user.id)) {
				this.server.to(member.user.id.toString()).emit('newMessage', message);
			}
		}
	}
	
	// @SubscribeMessage('typing')
	// typing(@MessageBody('id_group') id_group: number, @ConnectedSocket() client: Socket) {
	// 	const isTyping = this.messagesService.getClientName(id_group);
	// 	console.log('typing ', isTyping);
	// 	// client.broadcast.emit('typing', isTyping);
	// 	this.server.to(id_group.toString()).emit('broadcastyping', isTyping);
	// }

	//* ################################################# Group ###############################################################
	//*** 1- joinGoup   *******///

	@SubscribeMessage('joinGroup')
	async joinGroup(@MessageBody() joinGroup:joinGroupDto, @ConnectedSocket() client: SocketWithUserId) {
		// console.log('join group ', createUserToGroup, client.id);
		const group = await this.groupsService._joinGroup(client.userId, joinGroup);
		const message = await this.messagesService.identify(client.userId);
		// client.join("__group_"+group.name);
		this.server.to(client.id).emit('joinGroup2', message);
	}

	//* ################################################# Client connected ###############################################################

	handleConnection(@ConnectedSocket() client: SocketWithUserId)
	{
		client.data.id = client.userId;
		if (!this.connectedList.has(client.data.id))
		{
			this.connectedList.add(client.data.id);
			this.messagesService.setStatus(client.data.id, Userstatus.ONLINE);
		}
		// console.log('connectedlist ', this.connectedList);
		console.log("###id###", client.data.id);
		client.join(client.data.id.toString());
		console.log("rooom size", this.server.sockets.adapter.rooms.get(client.data.id.toString()).size );
		//! I may should add that the user is connected:
		this.server.to(client.id).emit('connection', client.userId);
		//* rooms and sids : https://socket.io/docs/v3/rooms/#:~:text=The%20%22room%22%20feature,subset%20of)%20clients
		// const rooms = this.server.of("/").adapter.rooms;
		// const sids = this.server.of("/").adapter.sids;
		// console.log("rooms", rooms);
		// console.log("sids", sids);
	}

	@SubscribeMessage('disconnect')
	handleDisconnect(@ConnectedSocket() client: SocketWithUserId)
	{
		console.log('disconnect ', client.userId);
		client.leave(client.userId.toString());
		if (this.server.sockets.adapter.rooms.get(client.data.id.toString()) == undefined)//(client.rooms.size === 0) // io.sockets.adapter.rooms.get(roomName).size
		{
			this.connectedList.delete(client.data.id);
			this.messagesService.setStatus(client.data.id, Userstatus.OFFLINE);
		}
		console.log('connectedlist ', this.connectedList);
		// this.server.to(client.id).emit('disconnect', client.handshake.headers.auth);
	}
}
