import { Injectable } from '@nestjs/common';
import * as dotenv from 'dotenv';
import { InjectRepository } from '@nestjs/typeorm';
import { Brackets, NotBrackets, Repository } from 'typeorm';
import { Group } from './entities/group.entity';
import { CreateGroupDto } from './dto/create-group.dto';
import { userInfo } from 'os';
import { UpdateGroupDto } from './dto/update-group.dto';
import { UserToGroup } from './entities/usertogroup.entity';
import { CreateUserToGroup } from './dto/create-user-to-group.dto';
import { WsException } from '@nestjs/websockets';
import { RemoveUserToGroup } from './dto/remove-user-to-group.dto';
import { Privacy } from './entities/group.entity';
import { User } from 'src/user/entities/user.entity';
import { channelModel } from 'src/types';
import { joinGroupDto } from './dto/join-group.dto';


export class GroupsService {
	constructor(
		@InjectRepository(Group)
		private groupRepository: Repository<Group>,
		@InjectRepository(User)
		private userRepository: Repository<User>,
		@InjectRepository(UserToGroup)
		private userToGroupRepository: Repository<UserToGroup>,
	) {}

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
			console.log("getChannelByUser", user_id);
			const user = await this.userRepository.findOneOrFail(
				{ where: {id: user_id}	}
			);
			const channels = await this.userToGroupRepository
			.createQueryBuilder("userToGroup")
			.leftJoinAndSelect("userToGroup.user", "user")
			.leftJoinAndSelect("userToGroup.group", "group")
			.select(['userToGroup.id', 'group.id', 'group.privacy', 'group.name', 'group.avatar', 'group.description'])
			.where("group.privacy IN (:...privacy)", {privacy: ['public', 'protected']})
			// .orWhere("user.id = :user_id", {user_id: user_id})
			.orWhere(
				new Brackets((qb) => {
					qb.where("group.privacy = :_privacy", {_privacy: 'private'})
					.andWhere("user.id = :user_id", {user_id: user_id})
				}),
			)
			.getMany();
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
			.select(['userToGroup.id','user.id', 'user.username', 'user.avatar', 'user.status'])
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

	async _joinGroup(id_user: number, groupdto:joinGroupDto){
		try
		{
			const user = await this.userRepository.findOneOrFail(
				{	where : { id: id_user }	}
			);
			const group = await this.groupRepository.findOneOrFail(
				{ where : {id : groupdto.id_group}}
			);
			if (group.privacy == 'dm')
				throw new Error("You can't join a dm");
			if (group.privacy == 'protected')
			{
				
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
			console.log("Error _joinGroup");
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
}
