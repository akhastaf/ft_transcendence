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


//////////////////////////////////////////////// grp services shit 							////////////////////////////////////////
// async joinGroup(createUserToGroup:CreateUserToGroup): Promise<UserToGroup>{

// 	try {
// 		const group = await this.groupRepository.findOneOrFail(
// 			{ where: {id: createUserToGroup.group.id}	}
// 		);
// 		// console.log("##########Group to join###########", createUserToGroup.group_id);
// 		const user = await this.userRepository.findOneOrFail(
// 			{ where: {id: createUserToGroup.user.id}	}
// 		);
// 		const check_userToGoup = await this.getUsertoGoupByGroupId(createUserToGroup.user.id, createUserToGroup.group.id);
// 		// console.log("check_userToGoup", check_userToGoup, createUserToGroup.user_id.id);
// 		if (check_userToGoup === null) {
// 			const usertogroup = await this.userToGroupRepository.create(createUserToGroup);
// 			console.log("User has joined the group!", createUserToGroup);
// 			return this.userToGroupRepository.save(createUserToGroup);
// 		} else {
// 			console.log("User already in group");
// 		}
// 	} catch (error) {
// 		console.log("joinGroup: Error");
// 		// throw new WsException('Invalid credentials.');
// 	}
// }

// async leaveGroup(removeUserFromGroup: RemoveUserToGroup): Promise<UserToGroup>{
// 	//! Here you may want check who the hell want to remove the user.
// 	try {
// 		// console.log("#### Leave Group :removeUserFromGroup.user_id ###########", removeUserFromGroup.user_id);
// 			const userToGroup = await this.getUsertoGoupByGroupId(removeUserFromGroup.user_id, removeUserFromGroup.group_id);
// 			const group = await this.groupRepository.findOne(
// 				{ where: {id: removeUserFromGroup.group_id}	}
// 			);
// 			// if (group && (group.owner_id.id === removeUserFromGroup.user_id)) {
// 			// console.log("You are the owner of the group, you can't leave it")
// 			await this.userToGroupRepository.remove(userToGroup);
// 			return userToGroup;
// 			// } else {
// 			// 	console.log("You are not the owner of the group, you can leave it");
// 			// 	throw new WsException('Permission denied.');
// 			// }
// 		}
// 		catch (error) {
// 			console.log("leaveGroup: User not found");
// 			// throw error;
// 		}
// }

// async deleteGroup(removeUserFromGroup: RemoveUserToGroup): Promise<Group>{
// 	try {
// 		const group = await this.groupRepository.findOne(
// 			{ where: {id: removeUserFromGroup.group_id}	}
// 		);
// 		if (group && (group.owner.id === removeUserFromGroup.user_id)) {
// 			console.log("You are the owner of the group, you can't leave it");
// 			await this.groupRepository.remove(group);
// 			return group;
// 		} else {
// 			console.log("You are not the owner of the group, you can leave it");
// 			throw new WsException('Permission denied.');
// 		}
// 	}
// 	catch (error) {
// 		console.log("deleteGroup: User not found");
// 		// throw error;
// 	}
// }

// async getAllGroups(): Promise<Group[]> {

// 	try {
// 		const groups = await this.groupRepository.find();
// 		console.log("Groups serevices", groups);
// 		return groups;
// 	} catch (error) {
// 		console.log("getAllGroups: Groups not found");
// 		// throw error;
// 	}
// }

// async getOneById(id: number): Promise<Group> {
// 	try {
// 		const  group =  this.groupRepository.findOneOrFail(
// 			{	where: {id: id}	}
// 		);
// 		return group;
// 	} catch (error) {
// 		console.log("getOneById: Group not found");
// 		// throw error;
// 	}
// }

// async updateGroup(updateGoup: UpdateGroupDto): Promise<Group>{
// 	try {
// 		const group = await this.groupRepository.findOneOrFail(
// 			{	where: {id: updateGoup.id}	}
// 		);
// 		group.name = updateGoup.name;
// 		//! Here you should check if the user is the owner of the group
// 		// if (updateGoup.id = group.owner_id) {
// 			// group.privacy = updateGoup.privacy;
// 			// group.password = updateGoup.password;
// 		// }
// 		return this.groupRepository.save(group);
// 	} catch (error) {
// 		console.log("UpdateGoup: Group not found");
// 		// throw error;
// 	}
// }

// async getUsertoGoupByGroupId(user_id: number, group_id: number): Promise<UserToGroup> | null {
// 	try {
// 		console.log("getUsertoGoupByGroupId", user_id, group_id);
// 		const group_ = await this.groupRepository.findOneOrFail(
// 			{ where: {id: group_id}	}
// 		);
// 		const user_ = await this.userRepository.findOneOrFail(
// 			{ where: {id: user_id}	}
// 		);
// 		const userToGoup = await this.userToGroupRepository
// 		.createQueryBuilder("userToGroup")
// 		.leftJoinAndSelect("userToGroup.user", "user")
// 		.leftJoinAndSelect("userToGroup.group", "group")
// 		.where("user.id = :user_id", {user_id: user_id})
// 		.andWhere("group.id = :group_id", {group_id: group_id})
// 		.getOne();
// 		return userToGoup;
// 	} catch (error) {
// 		console.log("getUsertoGoupByGroupId: Error");
// 		// throw error;
// 	}
// }
////////////////////////// gateway group shit //////////////////////////

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