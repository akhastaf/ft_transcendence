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


export class GroupsService {
	constructor(
		@InjectRepository(Group)
		private groupRepository: Repository<Group>,
		@InjectRepository(User)
		private userRepository: Repository<User>,
		@InjectRepository(UserToGroup)
		private userToGroupRepository: Repository<UserToGroup>,
	) {}

 	async createGroup(user: User, createGroupDto: CreateGroupDto){
		// const group = new Group(); newUser.name = name;
		//* Creates new entities and copies all entity properties from given objects into their new entities.
		//! You should check if the user exists:
		const createGroupWithUser = {owner: user, ...createGroupDto};
		const group = this.groupRepository.create(createGroupWithUser);
		return await this.groupRepository.save(group);
	}

	async getUsertoGoupByGroupId(user_id: number, group_id: number): Promise<UserToGroup> | null {
		try {
			console.log("getUsertoGoupByGroupId", user_id, group_id);
			console.log("getUsertoGoupByGroupId", user_id, group_id);
			const group_ = await this.groupRepository.findOneOrFail(
				{ where: {id: group_id}	}
			);
			const user_ = await this.userRepository.findOneOrFail(
				{ where: {id: user_id}	}
			);
			const userToGoup = await this.userToGroupRepository
			.createQueryBuilder("userToGroup")
			.leftJoinAndSelect("userToGroup.user", "user")
			.leftJoinAndSelect("userToGroup.group", "group")
			.where("user.id = :user_id", {user_id: user_id})
			.andWhere("group.id = :group_id", {group_id: group_id})
			.getOne();
			return userToGoup;
		} catch (error) {
			console.log("getUsertoGoupByGroupId: Error");
			// throw error;
		}
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
			console.log("userToGoup", channels);
			return channels;
		} catch (error) {
			console.log("getChannelByUser: Error");
			// throw error;
		}
	}

	//? member of a group.
	//! the function bellow wasn t tested yet .p
	async getMemberByChannel(group_id : number, user_id : number)
	{
		try{
			const group = await this.groupRepository.findOneOrFail(
				{ where: {id: group_id}	}
			);
			//! Elona, you should first check if this user allowed to check the group ' member.
			if (group.privacy != 'public')
			{
				const is_allowed = await this.userToGroupRepository
				.createQueryBuilder("userToGroup")
				.leftJoinAndSelect("userToGroup.user", "user")
				.leftJoinAndSelect("userToGroup.group", "group")
				.where("group.id = :group_id", {group_id : group_id})
				.andWhere("user.id = :user_id", {user_id: user_id})
				.getOne();
				console.log("is_allowed", is_allowed);
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
			
			console.log("halima, there are your members :", members);
			console.log("################### group_id:", group_id, user_id);
			return members;
		}
		catch(error)
		{
			console.log("getMemberByChannel: Error");
		}
	}

	//* End working shit
//! To improve !
	async joinGroup(createUserToGroup:CreateUserToGroup): Promise<UserToGroup>{

		try {
			const group = await this.groupRepository.findOneOrFail(
				{ where: {id: createUserToGroup.group.id}	}
			);
			// console.log("##########Group to join###########", createUserToGroup.group_id);
			const user = await this.userRepository.findOneOrFail(
				{ where: {id: createUserToGroup.user.id}	}
			);
			const check_userToGoup = await this.getUsertoGoupByGroupId(createUserToGroup.user.id, createUserToGroup.group.id);
			// console.log("check_userToGoup", check_userToGoup, createUserToGroup.user_id.id);
			if (check_userToGoup === null) {
				const usertogroup = await this.userToGroupRepository.create(createUserToGroup);
				console.log("User has joined the group!", createUserToGroup);
				return this.userToGroupRepository.save(createUserToGroup);
			} else {
				console.log("User already in group");
			}
		} catch (error) {
			console.log("joinGroup: Error");
			// throw new WsException('Invalid credentials.');
		}
	}

	async leaveGroup(removeUserFromGroup: RemoveUserToGroup): Promise<UserToGroup>{
		//! Here you may want check who the hell want to remove the user.
		try {
			// console.log("#### Leave Group :removeUserFromGroup.user_id ###########", removeUserFromGroup.user_id);
				const userToGroup = await this.getUsertoGoupByGroupId(removeUserFromGroup.user_id, removeUserFromGroup.group_id);
				const group = await this.groupRepository.findOne(
					{ where: {id: removeUserFromGroup.group_id}	}
				);
				// if (group && (group.owner_id.id === removeUserFromGroup.user_id)) {
				// console.log("You are the owner of the group, you can't leave it")
				await this.userToGroupRepository.remove(userToGroup);
				return userToGroup;
				// } else {
				// 	console.log("You are not the owner of the group, you can leave it");
				// 	throw new WsException('Permission denied.');
				// }
			}
			catch (error) {
				console.log("leaveGroup: User not found");
				// throw error;
			}
	}

	async deleteGroup(removeUserFromGroup: RemoveUserToGroup): Promise<Group>{
		try {
			const group = await this.groupRepository.findOne(
				{ where: {id: removeUserFromGroup.group_id}	}
			);
			if (group && (group.owner.id === removeUserFromGroup.user_id)) {
				console.log("You are the owner of the group, you can't leave it");
				await this.groupRepository.remove(group);
				return group;
			} else {
				console.log("You are not the owner of the group, you can leave it");
				throw new WsException('Permission denied.');
			}
		}
		catch (error) {
			console.log("deleteGroup: User not found");
			// throw error;
		}
	}

	async getAllGroups(): Promise<Group[]> {

		try {
			const groups = await this.groupRepository.find();
			console.log("Groups serevices", groups);
			return groups;
		} catch (error) {
			console.log("getAllGroups: Groups not found");
			// throw error;
		}
	}

	async getOneById(id: number): Promise<Group> {
		try {
			const  group =  this.groupRepository.findOneOrFail(
				{	where: {id: id}	}
			);
			return group;
		} catch (error) {
			console.log("getOneById: Group not found");
			// throw error;
		}
	}

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
//* ################################## a more convenient version ###########################

	async _joinGroup(id_user: number, id_group: number){
		try
		{
			const user = await this.userRepository.findOneOrFail(
				{	where : { id: id_user }	}
			);
			const group = await this.groupRepository.findOneOrFail(
				{ where : {id : id_group}}
			);
			const join = await this.userToGroupRepository
			.createQueryBuilder("userToGroup")
			.leftJoinAndSelect("userToGroup.user", "user")
			.leftJoinAndSelect("userToGroup.group", "group")
			.where("user.id = :user_id", {user_id: id_user})
			.andWhere("group.id = :group_id", {group_id: id_group})
			.getOne();
			return join;
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
			// .select(["group.id", "group.name", "group.privacy", "group.password", "group.owner_id"])
			// .where("group.privacy IN (:...privacy)", 
			// {
			// 	privacy: ['public', 'protected']
			// })
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
				console.log("getGroups", array);
			}
			return array;
		}
		catch(e)
		{
			console.log("Error getGroups");
		}
	}
}
