import { User } from "src/user/entities/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Group } from "./group.entity";

@Entity('Message')
export class Message {

	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	content : string;

	@CreateDateColumn()
	createdAt: Date;

	@ManyToOne(type => User, user => user.messages, {onDelete: 'CASCADE'})
	sender: User;

	@ManyToOne(type => Group, group => group.messages, {onDelete: 'CASCADE'})
	receiver: Group;
} 
