import { User } from "src/user/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Group } from "./group.entity";

export enum Status {
	ACTIVE = 'active',
	BANNED = 'banned',
	MUTED = 'muted',
	// KICKED = 'kicked',
}
export enum Role {
	OWNER = 'owner',
	ADMIN = 'admin',
	MEMBER = 'member'
}

@Entity('usertogroup')
export class UserToGroup {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({
		type: 'enum',
		enum: Role,
		default: Role.MEMBER
	})
	role: Role

	@Column({
		type: 'enum',
		enum: Status,
		default: Status.ACTIVE
	})	
	status: Status;

	@Column({nullable: true})
	until: Date;

	@ManyToOne(type => User, user => user.usertogroup, {onDelete: 'CASCADE'})
	user: User;

	@ManyToOne(type => Group, group => group.usertogroup, {onDelete: 'CASCADE'})
	group: Group;
}