import { WebSocketGateway, SubscribeMessage, MessageBody, WebSocketServer, ConnectedSocket, WsException } from '@nestjs/websockets';
import { MessagesService } from './messages.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { Server, Socket } from 'socket.io';
import { GroupsService } from './groups.service';
import { SocketWithUserId } from 'src/types';
import { joinGroupDto } from './dto/join-group.dto';
import { Userstatus } from 'src/user/entities/user.entity';
import { addUserDto } from './dto/add-user.dto';
import { Status } from './entities/usertogroup.entity';
import { GameService } from 'src/game/game.service';

@WebSocketGateway({
	cors: {
		origin: '*',
		// origin: 'http://localhost:3000',	// Allow only this origin	
		// credentials: true,	// Allow cookies
	}
})

//* ###################################################  Messages  ########################################################

	//*** 1- createMessage   *******//
	//*** 2- typing *******//

export class MessagesGateway {

	@WebSocketServer()
	server: Server; // Is a refrence to the socket.io server under the hood //* A reference to the underlying Engine.IO server.
	constructor(
		private readonly messagesService: MessagesService,
		private readonly gameService: GameService,
		private readonly groupsService: GroupsService) { }
		
	connectedList =	new Set<number>();

	@SubscribeMessage('sendMessage_client')
	async sendMessage(@MessageBody() createMessageDto: CreateMessageDto, @ConnectedSocket() client: Socket) {
		try
		{
			//! you can send a message to a group only if you are in it
			const is_allowed = await this.groupsService.isAllowed(client.data.id, createMessageDto.receiver_id);
			if (!is_allowed)
			{
				throw new WsException("You are not allowed to send a message to this group");
				console.log("You are not allowed to send a message to this group");
				return ; //! Should I send an error message ?
			}
			const message = await this.messagesService.sendMessage(createMessageDto, client.data.id);
			const members = await this.groupsService.getMemberByChannel(createMessageDto.receiver_id, client.data.id);
			//* send to all users in the room
			for (const member of members) {
				// Le message ne doit pas etre envoyé au client qui l'a envoyé: should be done by front ;[]
				// console.log('Halima da5lat', member.user.id, this.connectedList.has(member.user.id), this.connectedList);
				//* get all bocked users:
				const isBlocked = await this.groupsService.isBlocked(member.user.id, client.data.id);
				if (isBlocked || member.status === Status.BANNED)
					continue;
				//TODO check if the user is blocked:
				if (client.data.id != member.user.id && this.connectedList.has(member.user.id) && member.user.status !== Status.BANNED ) {
					this.server.to(member.user.id.toString()).emit('sendMessage_server', message);
				}
			}
		}
		catch (err)
		{
			throw new WsException(err.message);
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
	
	//*** 1- createDm
	//*** 2- joinGroup
	//*** 3- leaveGroup
	//*** 4- addUser
	//*** 5- removeUser

	// * ######################################################################################################################
	
	//*** 1- createDm */

	@SubscribeMessage('createDm_client')
	async createDm(@MessageBody() second_user_id:number, @ConnectedSocket() client: SocketWithUserId) {
		try
		{
			const dm = await this.groupsService.createDm(client.userId, second_user_id);
			this.server.to(client.userId.toString()).emit('createDm_server', dm);
			return dm;
		}
		catch (err)
		{
			throw new WsException(err.message);
		}
	}
	
	//*** 2- joinGoup   */

	@SubscribeMessage('joinGroup_client')
	async joinGroup(@MessageBody() joinGroup:joinGroupDto, @ConnectedSocket() client: SocketWithUserId) {
		// console.log('join group ', createUserToGroup, client.id);
		try
		{

			const group = await this.groupsService.joinGroup(client.userId, joinGroup);
			if (!group)
				return false;
			const message = await this.messagesService.identify(client.userId, 'has joined the channel');
			// client.join("__group_"+group.name);
			// this.server.to(client.userId.toString()).emit('joinGroup_sever', message);
			const members = await this.groupsService.getMemberByChannel(joinGroup.id_group, client.data.id);
			//* send to all users in the room
			if (members)
			{
				for (const member of members) {
					if (this.connectedList.has(member.user.id) && member.user.status !== Status.BANNED) {
						this.server.to(member.user.id.toString()).emit('joinGroup_server', message);
					}
				}
			}
		}
		catch (err)
		{
			throw new WsException(err.message);
		}
	}

	//*** 3- leaveGroup   */
	@SubscribeMessage('leaveGroup_client')
	async leaveGroup(@MessageBody() groupdto:joinGroupDto, @ConnectedSocket() client: SocketWithUserId) {
		try
		{
			const members = await this.groupsService.getMemberByChannel(groupdto.id_group, client.data.id);
			if (!members)
				return false;
			const group = await this.groupsService.leaveGroup(client.userId, groupdto);
			// console.log('leave group ', group);
			// console.log('leave group ', groupdto);
			if (!group)
				return false;
			const message = await this.messagesService.identify(client.userId, 'has left the channel');
			console.log('members ', members);
			//* send to all users in the room
			for (const member of members) {
				if (client.data.id != member.user.id && this.connectedList.has(member.user.id) && member.user.status !== Status.BANNED) {
					this.server.to(member.user.id.toString()).emit('leaveGroup_server', message);
				}
			}
			return true;
		}
		catch (err)
		{
			throw new WsException(err.message);
		}
	}


	// *** 4- add user   */
	@SubscribeMessage('addUser_client')
	async addUser(@MessageBody() data: addUserDto, @ConnectedSocket() client: SocketWithUserId) {
		try
		{
			//! U should check the return of this function.
			const is_added = await this.groupsService.addUser(client.userId, data);
			if (is_added)
			{
				const message = await this.messagesService.identify(data.id_user, 'has been added to the channel');
				const members = await this.groupsService.getMemberByChannel(data.id_group, client.data.id);
				//* send to all users in the room
				for (const member of members) {
					if (this.connectedList.has(member.user.id) && member.user.status !== Status.BANNED) {
						this.server.to(member.user.id.toString()).emit('addUser_server', message);
					}
				}
			}
		}
		catch (err)
		{
			throw new WsException(err.message);
		}
	}

	// *** 5- remove user   */
	@SubscribeMessage('removeUser_client')
	async removeUser(@MessageBody() data: addUserDto, @ConnectedSocket() client: SocketWithUserId) {
		try
		{
			const is_removed = await this.groupsService.removeUser(client.userId, data);
			if (is_removed)
			{
				const message = await this.messagesService.identify(data.id_user, 'has been removed from the channel');
				const members = await this.groupsService.getMemberByChannel(data.id_group, client.data.id);
				//* send to all users in the room
				for (const member of members) {
					if (this.connectedList.has(member.user.id) && member.user.status !== Status.BANNED) {
						this.server.to(member.user.id.toString()).emit('removeUser_server', message);
					}
				}
				this.server.to(data.id_user.toString()).emit('removeUser_server', message);
			}
		}
		catch (err)
		{
			throw new WsException(err.message);
		}
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
		console.log("connected", client.data.id);
		console.log('connectedlist ', this.connectedList);
		client.join(client.data.id.toString());
		console.log("rooom size of ", client.data.id, this.server.sockets.adapter.rooms.get(client.data.id.toString()).size );
		//! I may should add that the user is connected:
		// this.server.to(client.userId.toString()).emit('connection', client.userId);
		this.server.emit('connection', this.connectedList);
		//* rooms and sids : https://socket.io/docs/v3/rooms/#:~:text=The%20%22room%22%20feature,subset%20of)%20clients
		// const rooms = this.server.of("/").adapter.rooms;
		// const sids = this.server.of("/").adapter.sids;
		// console.log("rooms", rooms);
		// console.log("sids", sids);
	}

	@SubscribeMessage('disconnect_client')
	async handleDisconnect(@ConnectedSocket() client: SocketWithUserId)
	{
		await this.gameService.removePlayer(client);
		console.log('disconnect ', client.userId);
		client.leave(client.userId.toString());
		if (this.server.sockets.adapter.rooms.get(client.data.id.toString()) == undefined)//(client.rooms.size === 0) // io.sockets.adapter.rooms.get(roomName).size
		{
			this.connectedList.delete(client.data.id);
			this.messagesService.setStatus(client.data.id, Userstatus.OFFLINE);
			this.server.emit('disconnect_server', this.connectedList);
		}
		console.log('connectedlist ', this.connectedList);
	}
}
//*: Halima you should check if the owner want to leave a group => Done
//* : a blocked user message shouldn t be seen by the user. => Done
// TODO : Elona you should check if an admin can kick/mute/ban another admin => Done
// TODO : Elona you should add play to status, may be you will need to use a map instead of the set
//  so you can record the status of a user in addition to his id. how smart
// TODO : Elona group members cnt be seen by someone not in the grp