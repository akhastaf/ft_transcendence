import { Injectable, NotFoundException} from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { Message } from './entities/message.entity';
import * as dotenv from 'dotenv';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Group } from './entities/group.entity';
import { User, Userstatus } from 'src/user/entities/user.entity';
import { messageModel } from 'src/types';
dotenv.config({ path: '.env' });

@Injectable()
export class MessagesService {
	constructor(
		@InjectRepository(User)
		private userRepository: Repository<User>,
		@InjectRepository(Group)
		private groupRepository: Repository<Group>,
		@InjectRepository(Message)
		private messageRepository: Repository<Message>,
	) { }

	async sendMessage(message: CreateMessageDto, sender_id: number) {
		try {
			const sender = await this.userRepository.findOneByOrFail({ id: sender_id });
			const receiver = await this.groupRepository.findOneByOrFail({ id: message.receiver_id });
			//! Should   I ckeck if the sender is in the group ?
			// const is_allowed = await this.groupRepository.joinGroup(sender_id, message.receiver_id);
			const newMessage = this.messageRepository.create(message);
			newMessage.sender = sender;
			newMessage.receiver = receiver;
			const element = await this.messageRepository.save(newMessage);

			const modelMsg = new messageModel();
			modelMsg.message = element.content;
			modelMsg.userId = element.sender.id;
			modelMsg.userName = element.sender.username;
			modelMsg.date = element.createdAt;
			modelMsg.currentUser = element.sender.id == sender_id ? true : false;
			modelMsg.avatar = element.sender.avatar;
			return modelMsg;
		}
		catch (e) {
			throw new NotFoundException(e.message);
			console.log("sendMessage: Error");
		}
	}

// #######################################################################################
//! hadi still ma5damtch biha, but its usefull 
	async identify(id : number, msg: string) {
		const name = await this.getClientName(id);
		const message = { name, message: msg };
		return message;
		// return Object.values(this.clientToUser); // whose connected
	}

	async getClientName(client_id: number): Promise<string> {
		const user = await this.userRepository.findOneByOrFail({ id: client_id });
		return user.username;
	}
//#######################################################################################
	///* Controller shiit */
	async	getDmMessages(id_receiver: number): Promise<Message[]> | null{
		try {
			const dm = await this.groupRepository.findOneByOrFail({ id: id_receiver });
			if (!dm || dm.privacy != 'dm') {
				return null;
				//! When should I throw an exception ?
				// throw new Error("getDmMessages: Error");
			}
			const messages = await this.messageRepository
				.createQueryBuilder('message')
				.leftJoinAndSelect('message.receiver', 'receiver')
				.leftJoinAndSelect('message.sender', 'sender')
				.where('receiver.id =:id_receiver', { id_receiver: id_receiver })
				.getMany();
			return messages;
		}
		catch (e) {
			throw new NotFoundException(e.message);
			console.log("getDmMessages: Error");
		}
	}
	async	getRoomMessages(id_receiver: number): Promise<Message[]> | null{
		try {
			const room = await this.groupRepository.findOneByOrFail({ id: id_receiver });
			if (!room) {
				return null;
				//! When should I throw an exception ?
				// throw new Error("getDmMessages: Error");
			}
			const messages = await this.messageRepository
				.createQueryBuilder('message')
				.leftJoinAndSelect('message.receiver', 'receiver')
				.leftJoinAndSelect('message.sender', 'sender')
				.where('receiver.id =:id_receiver', { id_receiver: id_receiver })
				.getMany();
			return messages;
		}
		catch (e) {
			throw new NotFoundException(e.message);
			console.log("getDmMessages: Error");
		}
	}

	//#####################################################################################
	// Lets get this shit done
	//* Set client service :
	async     setStatus(client_id: number, status: Userstatus) {
		try {
			const user = await this.userRepository.findOneByOrFail({ id: client_id });
			user.status = status;
			return await this.userRepository.save(user);
		}
		catch (e) {
			throw new NotFoundException(e.message);
			console.log("setStatus: Error");
		}
	}
}