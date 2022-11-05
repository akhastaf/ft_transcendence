// import { WebSocketGateway, SubscribeMessage, MessageBody, WebSocketServer, ConnectedSocket } from '@nestjs/websockets';
// import { MessagesService } from './messages.service';
// import { CreateMessageDto } from './dto/create-message.dto';
// import { UpdateMessageDto } from './dto/update-message.dto';
// import { Server, Socket } from 'socket.io';
// import { CreateGroupDto } from './dto/create-group.dto';
// import { GroupsService } from './groups.service';
// import { CreateUserToGroup } from './dto/create-user-to-group.dto';
// import { RemoveUserToGroup } from './dto/remove-user-to-group.dto';
// import { memberModel, messageModel } from 'src/types';
// import { Userstatus } from 'src/User/User.entity';

// @WebSocketGateway({
// 	cors: {
// 		origin: '*',
// 	}
// })


// export class MessagesGateway {
// 	@WebSocketServer()
// 	server: Server; // Is a refrence to the socket.io server under the hood //* A reference to the underlying Engine.IO server.
// 	constructor(
// 		private readonly messagesService: MessagesService,
// 		private readonly groupsService: GroupsService) { }
		
// 		connectedList =	new Set<number>();   
// 	//* ###################################################  Messages  ########################################################
	
// 		//*** 1- sendMessage   *******//
// 		// TODO: should test it on a group that contains more than 2 users
// 		@SubscribeMessage('sendMessage')
// 		async sendMessage(@MessageBody() createMessageDto: CreateMessageDto, @ConnectedSocket() client: Socket) {
// 			const message = await this.messagesService.sendMessage(createMessageDto, client.data.id);
// 			const members = await this.groupsService.getMemberByChannel(createMessageDto.receiver_id, client.data.id);
// 			// // TODO send to all users in the room
// 			for (const member of members) {
// 				// Le message ne doit pas etre envoyé au client qui l'a envoyé: should be done by front ;[]
// 				if (client.data.id != member.user.id && this.connectedList.has(member.user.id)) {
// 					this.server.to(member.user.id.toString()).emit('newMessage', message);
// 				}
// 			}
// 		}
// 		//*** 2- typing *******//

// 		//* #################################################	Client connected	#################################################
// 		//! Hna i should somehow check the user
// 		handleConnection(@ConnectedSocket() client: Socket)
// 		{
// 			client.data.id = +client.handshake.headers.auth;
// 			if (!this.connectedList.has(client.data.id))
// 			{
// 				this.connectedList.add(client.data.id);//! To improve // Nan to handle
// 				this.messagesService.setStatus(client.data.id, Userstatus.ONLINE);
// 			}
// 			this.server.socketsJoin(client.data.id.toString());
// 			//! I may should add that the user is connected:
// 			this.server.to(client.id).emit('is_connected', client.data.id);
// 		}
// 		//* ################################################# Members	###########################################################
		
// 			// *** 1- getMembers *********//
// 			//! tested with postman :
// 			@SubscribeMessage('getMember')
// 			async getMembers(@MessageBody() id_group:number, @ConnectedSocket() client: Socket) {
// 				let arr = new Array();
// 				const members = await this.groupsService.getMemberByChannel(id_group, client.data.id);
// 				if (members)
// 				{
// 					members.forEach(element => {
// 						let member = new memberModel();
// 						member.id = element.user.id;
// 						member.name = element.user.username;
// 						member.avatar = element.user.avatar;
// 						member.is_connected = this.connectedList.has(member.id);
// 						arr.push(member);
// 					});
// 				}
// 				this.server.to(client.id).emit('getMember', arr);
// 			}
// 	//* #################################################	Join group 		#################################################

// 	@SubscribeMessage('joinGroup')
// 	async joinGroup(@MessageBody() id_group:number, @ConnectedSocket() client: Socket) {
		
// 	}
// }
