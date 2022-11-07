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
		const message = await this.messagesService.sendMessage(createMessageDto, client.data.id);
		const members = await this.groupsService.getMemberByChannel(createMessageDto.receiver_id, client.data.id);
		console.log('create msg: ', message);
		console.log('group member: ', members);
		// TODO send to all users in the room
		for (const member of members) {
			// Le message ne doit pas etre envoyé au client qui l'a envoyé: should be done by front ;[]
			console.log('Halima da5lat', member.user.id, this.connectedList.has(member.user.id), this.connectedList);
			if (client.data.id != member.user.id && this.connectedList.has(member.user.id)) {
				console.log('Halima 5arjat');
				console.log('send to: ', member.user.id);
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
	//*** 1- joinGoup   *******//
	//*** 2- leaveGroup *******//
	//*** 2- updateGroup *******//
	//*** 3- getGroups  *******//
	//*** 4- createGroup *******//
	//*** 5- deleteGroup *******//

// 	@SubscribeMessage('join')

// 	@SubscribeMessage('joinGroup')
// 	async joinGroup(@MessageBody() createUserToGroup:CreateUserToGroup, @ConnectedSocket() client: Socket) {
// 		client.data.current_room =
// 		console.log('join group ', createUserToGroup, client.id);
// 		const group = await this.groupsService.joinGroup(createUserToGroup);
// 		const message = await this.messagesService.identify(createUserToGroup.id);
// 		// client.join("__group_"+group.name);
// 		this.server.to(client.id).emit('joinGroup', group);
// 	}

// 	@SubscribeMessage('leaveGroup')
// 	async leaveGroup(@MessageBody() removeUserFromGroup: RemoveUserToGroup, @ConnectedSocket() client: Socket) {
// 		const group = await this.groupsService.leaveGroup(removeUserFromGroup);
// 		console.log('leaveGroup ', group);

// 		this.server.to(client.id).emit('leaveGroup', group);
// 	}
	
// 	@SubscribeMessage('updateGroup')
// 	async updateGroup(@MessageBody() updateGroupDto: CreateGroupDto, @ConnectedSocket() client: Socket) {
// 		const group = await this.groupsService.updateGroup(updateGroupDto);
// 		console.log('updateGroup ', group);
// 		this.server.to(client.id).emit('updateGroup', group);
// 	}

// 	@SubscribeMessage('getAllGroups')
// 	async getGroups(@ConnectedSocket() client: Socket) {
// 		console.log("Socketa");
// 		const groups = await this.groupsService.getAllGroups();
// 		console.log("halinma ",groups);
// 		this.server.to(client.id).emit('getAllGroups', groups);
// 		return groups;
// 	}

// 	@SubscribeMessage('createGroup')
// 	async createGroup(@MessageBody() createGroupDto: CreateGroupDto, @ConnectedSocket() client: Socket) {
		
// 		const group = await this.groupsService.createGroup(createGroupDto);
// 		console.log('createGroup ', createGroupDto);
// 	}
// //! To improve, the id of the user  shoud be taken from the token / socket.user.id :
// 	@SubscribeMessage('deleteGroup')
// 	async deleteGroup(@MessageBody() removeUserFromGroup: RemoveUserToGroup, @ConnectedSocket() client: Socket) {
// 		const group = await this.groupsService.deleteGroup(removeUserFromGroup);
// 		console.log('deleteGroup ', group);
// 		this.server.to(client.id).emit('deleteGroup', group);
// 	}

	//* ################################################# Client connected ###############################################################

	handleConnection(@ConnectedSocket() client: SocketWithUserId)
	{

		client.data.id = client.userId;//+client.handshake.headers.auth;
		if (!this.connectedList.has(client.data.id))
			this.connectedList.add(client.data.id);//! To improve // Nan to handle
		console.log('connectedlist ', this.connectedList);
		console.log("###id###", client.data.id);
		// client.join("__connected_"+user.login);
		// this.server.to("__connected_"+user.login).emit();
		client.join(client.data.id.toString());
		// this.server.socketsJoin(client.data.id.toString());
		//! I may should add that the user is connected:
		this.server.to(client.id).emit('connection', client.handshake.headers.auth);
	}

}
