import { User } from "src/user/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Group } from "./group.entity";

export enum Status {
	ACCEPTED = 'accepted',
	PENDING = 'pending',
	MUTED = 'muted',
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

	// @Column({default: false})
	// is_admin: boolean;

	@Column({
		type: 'enum',
		enum: Role,
		default: Role.MEMBER
	})

	role: Role
	@Column({
		type: 'enum',
		enum: Status,
		default: Status.ACCEPTED
	})	
	status: Status;

	@Column({nullable: true})
	until: Date;

	@ManyToOne(type => User, user => user.usertogroup)
	user: User;

	@ManyToOne(type => Group, group => group.usertogroup)
	group: Group;
}