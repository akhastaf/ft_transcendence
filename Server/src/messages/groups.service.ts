import { InjectRepository } from '@nestjs/typeorm';
import { Brackets, Repository } from 'typeorm';
import { Group, Privacy } from './entities/group.entity';
import { CreateGroupDto } from './dto/create-group.dto';
import { Role, Status, UserToGroup } from './entities/usertogroup.entity';
import { User } from 'src/user/entities/user.entity';
import { channelModel, memberModel } from 'src/types';
import { joinGroupDto } from './dto/join-group.dto';
import * as bcrypt from 'bcryptjs';
import { addUserDto } from './dto/add-user.dto';
import { HttpException } from '@nestjs/common';


export class GroupsService {
	constructor(
		@InjectRepository(Group)
		private groupRepository: Repository<Group>,
		@InjectRepository(User)
		private userRepository: Repository<User>,
		@InjectRepository(UserToGroup)
		private userToGroupRepository: Repository<UserToGroup>,
	) {}

	async isDmCreated(id_user: number, id_second_user: number){
		try {
			const group_name = `dm${Math.min(id_user, id_second_user)}${Math.max(id_user, id_second_user)}`;
			const group = await this.groupRepository.findOne({
				where: {
					privacy: Privacy.DM,
					name : group_name}
				});
			return group;
		} catch (error) {
			console.log("dmExists: Error");
		}
	}

	async createDm(id_user: number, id_second_user: number) {
		try {
			if (id_user === id_second_user)
				return null;
			const user = await this.userRepository.findOneOrFail(
				{ where: {id: id_user}	});
			const second_user = await this.userRepository.findOneOrFail(
				{ where: {id: id_second_user}	});
			let group = await this.isDmCreated(id_user, id_second_user);
			if (!group)
			{
				group = new Group();
				group.name = `dm${Math.min(user.id,second_user.id)}${Math.max(user.id,second_user.id)}`;
				group.privacy = Privacy.DM;
				group.owner = user;
				group = await this.groupRepository.save(group);
				//* join the users to the dm
				let joinDm = new UserToGroup();
				joinDm.user = user;
				joinDm.group = group;
				await this.userToGroupRepository.save(joinDm);
				joinDm = new UserToGroup();
				joinDm.user = second_user;
				joinDm.group = group;
				await this.userToGroupRepository.save(joinDm);
			}
			let channel = new channelModel();
			channel.id = group.id;
			channel.name = second_user.username;
			channel.avatar = second_user.avatar;
			channel.privacy = group.privacy;
			channel.description = null;
			return channel;
		}
		catch(error){
			console.log("createDm: Error");
		}
	}

//*  Working & tested by postman
 	async createGroup(user: User, createGroupDto: CreateGroupDto){
		// const group = new Group(); newUser.name = name;
		//* Creates new entities and copies all entity properties from given objects into their new entities.
		const createGroupWithUser = {owner: user, ...createGroupDto};
		let group = this.groupRepository.create(createGroupWithUser);
		group = await this.groupRepository.save(group);
		//* join the owner to the group
		const joinGroup = new UserToGroup();
		joinGroup.user = user;
		joinGroup.role = Role.OWNER;
		joinGroup.group = group;
		await this.userToGroupRepository.save(joinGroup);
		return group;
	}

//*  Working shit : Controller 
	async getDmByUser(user_id: number): Promise<UserToGroup[]> | null{
		try {
			const user = await this.userRepository.findOneOrFail(
				{ where: {id: user_id}	}
			);

			const dms = await this.userToGroupRepository
			.createQueryBuilder("userToGroup")
			.leftJoinAndSelect("userToGroup.user", "user")
			.leftJoinAndSelect("userToGroup.group", "group")
			.select(['userToGroup.id', 'group.id', 'group.privacy', 'group.name', 'group.avatar'])
			.where("group.privacy = :privacy", {privacy: 'dm'})
			.andWhere("user.id = :user_id", {user_id: user_id})
			.getMany();
			return dms;
		}
		catch(error){
			console.log("getDmByUser: Error");
		}
	}

	async getChannelByUser(user_id: number): Promise<UserToGroup[]> | null {
		try {
			// console.log("getChannelByUser", user_id);
			const user = await this.userRepository.findOneOrFail(
				{ where: {id: user_id}	}
			);
			const channels = await this.userToGroupRepository
			.createQueryBuilder("userToGroup")
			.leftJoinAndSelect("userToGroup.user", "user")
			.leftJoinAndSelect("userToGroup.group", "group")
			.select(['userToGroup.id', 'group.id', 'group.privacy', 'group.name', 'group.avatar', 'group.description'])
			.where("group.privacy != :privacy", {privacy: 'dm'})
			.andWhere("user.id = :user_id", {user_id: user_id})
			.getMany();
			// .where("group.privacy IN (:...privacy)", {privacy: ['public', 'protected']})
			// // .orWhere("user.id = :user_id", {user_id: user_id})
			// .orWhere(
			// 	new Brackets((qb) => {
			// 		qb.where("group.privacy = :_privacy", {_privacy: 'private'})
			// 		.andWhere("user.id = :user_id", {user_id: user_id})
			// 	}),
			// )
			// .getMany();
			// console.log("userToGoup", channels);
			return channels;
		} catch (error) {
			console.log("getChannelByUser: Error");
			// throw error;
		}
	}

	//? member of a group.
	async getMemberByChannel(group_id : number, user_id : number)
	{
		try{
			const group = await this.groupRepository.findOneOrFail(
				{ where: {id: group_id}	}
			);
			if (group.privacy != 'public')
			{
				const is_allowed = await this.userToGroupRepository
				.createQueryBuilder("userToGroup")
				.leftJoinAndSelect("userToGroup.user", "user")
				.leftJoinAndSelect("userToGroup.group", "group")
				.where("group.id = :group_id", {group_id : group_id})
				.andWhere("user.id = :user_id", {user_id: user_id})
				.getOne();
				if (!is_allowed)
					throw new Error("You are not allowed to check this group's member");
			}
			const members = await this.userToGroupRepository
			.createQueryBuilder("userToGroup")
			.leftJoinAndSelect("userToGroup.user", "user")
			.leftJoinAndSelect("userToGroup.group", "group")
			.select(['userToGroup.id','user.id', 'user.username', 'user.avatar', 'user.status', 'userToGroup.role'])
			.where("group.id = :group_id", {group_id : group_id})
			.getMany();
			
			return members;
		}
		catch(error)
		{
			console.log("getMemberByChannel: Error");
		}
	}

	//* End working shit

//* ################################## a more convenient version ###########################

	async joinGroup(id_user: number, groupdto:joinGroupDto){
		try
		{
			const user = await this.userRepository.findOneOrFail(
				{	where : { id: id_user }	}
			);
			const group = await this.groupRepository.findOneOrFail(
				{ where : {id : groupdto.id_group}}
			);
			if (group.privacy == 'dm')
				throw new Error("You can't join");
			if (group.privacy == 'protected')
			{
				if (!await bcrypt.compare(groupdto.password, group.password))
					throw new Error("Wrong password");
			}
			const joined = await this.userToGroupRepository
			.createQueryBuilder("userToGroup")
			.leftJoinAndSelect("userToGroup.user", "user")
			.leftJoinAndSelect("userToGroup.group", "group")
			.where("user.id = :user_id", {user_id: id_user})
			.andWhere("group.id = :group_id", {group_id: groupdto.id_group})
			.getOne();
			if (!joined)
			{
				const joinGroup = new UserToGroup();
				joinGroup.user = user;
				joinGroup.group = group;
				await this.userToGroupRepository.save(joinGroup);
				return joinGroup;
			}
			return joined;
		}
		catch(e)
		{
			console.log("Error joinGroup");
		}
	}

//* ################################## getGroups ###########################

	async getGroups(): Promise<Array<channelModel>>{
		try
		{
			const groups = await this.groupRepository
			.createQueryBuilder("group")
			.where("group.privacy IN (:...privacy)", { privacy: [ "public", "protected"] })
			.getMany();
			const array = new Array();
			if (groups)
			{
				groups.forEach(element => {
					let channel = new channelModel();
					channel.id = element.id;
					channel.name = element.name;
					channel.avatar = element.avatar;
					channel.privacy = element.privacy;
					channel.description = element.description;
					console.log("make it Heeeere", channel);
					array.push(channel);
				});
				// console.log("getGroups", array);
			}
			return array;
		}
		catch(e)
		{
			console.log("Error getGroups");
		}
	}

	//* ################################## isGroupMember ###########################

	async isGroupMember(id_user: number, id_group: number){
		try
		{
			const is_member = await this.userToGroupRepository
			.createQueryBuilder("userToGroup")
			.leftJoinAndSelect("userToGroup.user", "user")
			.leftJoinAndSelect("userToGroup.group", "group")
			.where("group.id = :group_id", {group_id : id_group})
			.andWhere("user.id = :user_id", {user_id: id_user})
			.getOne();
			return is_member;
		}
		catch(e)
		{
			console.log("Error isGroupMember");
		}
	}

	//* ############################################# add User ##############################
	
	async addUser(id_user: number, info:addUserDto)
	{
		try{
			const join = await this.isGroupMember(id_user, info.id_group);
			if (join?.role === Role.ADMIN || join?.role === Role.OWNER)
			{
				const dto:joinGroupDto = info;
				return await this.joinGroup(id_user, dto);
			}
			//! I may should throw an exception
			return null;
		}
		catch(e)
		{
			console.log("Error addUser");
		}
	}

//* ############################################# getUserRole ##############################

	async getUserRole(id_user: number, id_group: number){
		try
		{
			const role = await this.userToGroupRepository
			.createQueryBuilder("userToGroup")
			.leftJoinAndSelect("userToGroup.user", "user")
			.leftJoinAndSelect("userToGroup.group", "group")
			.where("group.id = :group_id", {group_id : id_group})
			.andWhere("user.id = :user_id", {user_id: id_user})
			.getOne();
			return role?.role;	
		}
		catch(e)
		{
			console.log("Error getUserRole");
		}
	}


	//* ############################################# getBockedUser ##############################

	async getBockedUser(id_user: number){
		try
		{
			const blocked = await this.userRepository
			.createQueryBuilder("user")
			.leftJoinAndSelect("user.bloked", "blocked")
			.where("user.id = :user_id", {user_id: id_user})
			.select(['user.id', 'blocked.id', 'blocked.username', 'blocked.avatar'])
			.getOne();
			if (blocked)
			{
				const array = new Array();
				blocked.bloked.forEach(element => {
					let user = new memberModel();
					user.id = element.id;
					user.name = element.username;
					user.avatar = element.avatar;
					array.push(user);
				});
				return array;
			}
			return null;
		}
		catch(e)
		{
			console.log("Error getBockedUser");
		}
	}

	//* ############################################# remove User ##############################

	async removeUser(id_user: number, info:addUserDto)
	{
		try{
			const join = await this.isGroupMember(id_user, info.id_group);
			if (join?.role === Role.ADMIN || join?.role === Role.OWNER)
			{
				const user = await this.getUserRole(info.id_user, info.id_group);
				if (join?.role === Role.ADMIN && user === Role.OWNER)
					throw new Error("You can't remove the owner");
				const kicked = await this.leaveGroup(info.id_user, {... info});
				return kicked;
			}
		}
		catch(e)
		{
			console.log("Error removeUser");
		}
	}
				
	//* ############################################# leaveGroup ##############################
//! You should check if the if the user is the owner of the group.
	async leaveGroup(id_user: number, groupdto:joinGroupDto){
		try
		{
			const user = await this.userRepository.findOneOrFail(
				{	where : { id: id_user }	}
			);
			const group = await this.groupRepository.findOneOrFail(
				{ where : {id : groupdto.id_group}}
			);
			if (group.privacy == 'dm')
				throw new Error("You can't leave");
			if (group.privacy == 'protected')
			{
				if (!await bcrypt.compare(groupdto.password, group.password))
					throw new Error("Wrong password");
			}
			const role = await this.getUserRole(id_user, groupdto.id_group);
			if (role === Role.OWNER)
			{
				const members = await this.getMemberByChannel(groupdto.id_group, id_user);
				//! hadi tar9i3a, here i should remove the grp
				if (members.length == 1)
					throw new Error("You can't leave the group");
				else
				{
					const admin = await members.find(async element => {
						if (element.role === Role.ADMIN)
						{
							group.owner = element.user;
							await this.groupRepository.save(group);
							element.role = Role.OWNER;
							await this.userToGroupRepository.save(element);
						}
					});
					if (!admin)
					{
						await members.find(async element => {
							if (element.role !== Role.ADMIN)
							{
								group.owner = element.user;
								await this.groupRepository.save(group);
								element.role = Role.OWNER;
								await this.userToGroupRepository.save(element);
							}
						});
					}
				}

			}
			const joined = await this.userToGroupRepository
			.createQueryBuilder("userToGroup")
			.leftJoinAndSelect("userToGroup.user", "user")
			.leftJoinAndSelect("userToGroup.group", "group")
			.delete()
			.where("user.id = :user_id", {user_id: id_user})
			.andWhere("group.id = :group_id", {group_id: groupdto.id_group})
			.execute();
			return joined;
		}
		catch(e)
		{
			console.log("Error joinGroup");
		}
	}

	// * ############################################# isAllowed ##############################

	async isAllowed(id_user: number, id_group: number)
	{
		try
		{
			const is_member = await this.isGroupMember(id_user, id_group);
			if (!is_member)
			{
				console.log("You are not allowed to send a message to this group");
				return false;
			}
			const group = await this.groupRepository.findOneOrFail(
				{ where : {id : id_group}}
			);
			if (group.privacy == Privacy.DM)
			{
				// * check if the sender is included in the receiver's blocked list
				const join = await this.userToGroupRepository
				.createQueryBuilder("userToGroup")
				.leftJoinAndSelect("userToGroup.user", "user")
				.leftJoinAndSelect("userToGroup.group", "group")
				.leftJoinAndSelect("user.bloked", "blocked")
				.where("group.id = :group_id", {group_id : id_group})
				.andWhere("user.id != :user_id", {user_id: id_user})
				.getOne();
				const is_blocked = join?.user?.bloked?.some(el => el.id === is_member.user.id);
				const user = await this.userRepository
				.createQueryBuilder("user")
				.leftJoinAndSelect("user.bloked", "blocked")
				.where("user.id = :user_id", {user_id: id_user})
				.getOne();
				const is_blocked2 = user?.bloked?.some(el => el.id === join.user.id);
				return !is_blocked && !is_blocked2;
			}
			let date = new Date;
			if (is_member.status == Status.BANNED || is_member.status == Status.MUTED)
			{
				if (is_member.until > date)
					return false;
				else
				{
					is_member.status = Status.ACCEPTED;
					is_member.until = null;
					await this.userToGroupRepository.save(is_member);
					return true;
				}
			}
			return true;
		}
		catch(e)
		{
			console.log("Error isAllowed");
		}
	}

	// * ############################################# set Admin ##############################

	// async setAdmin(id_user: number, data: addUserDto)
	// {
	// 	try
	// 	{
	// 		const is_member = await this.isGroupMember(id_user, data.id_group);
	// 		if (!is_member || is_member.role !== Role.OWNER)
	// 		{
	// 			console.log("You are not allowed to set admin");
	// 			return false;
	// 		}
	// 		const join = await this.userToGroupRepository


	// 	}
	// 	catch(e)
	// 	{
	// 		console.log("Error setAdmin");
	// 	}
	// }
}
