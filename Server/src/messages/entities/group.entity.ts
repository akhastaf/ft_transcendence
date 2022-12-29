import { BeforeInsert, Column, CreateDateColumn, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { UserToGroup } from "./usertogroup.entity";
import { Message } from "./message.entity";
import { User } from "src/user/entities/user.entity";
import * as bcrypt from 'bcryptjs';
import { Exclude } from "class-transformer";
import * as dotenv from "dotenv";
dotenv.config({ path: __dirname+'/../../../.env' });

export enum Privacy {
	DM = 'dm',
	PUBLIC = 'public',
	PRIVATE = 'private',
	PROTECTED = 'protected'
}  

@Entity('groups')
export class Group {

	@PrimaryGeneratedColumn()
	id: number;

	// @Column({default: true})
	// is_direct: boolean;

	@Column({
		type: 'enum',
		enum: Privacy,
		default: Privacy.PUBLIC
	})
	privacy: Privacy;

	@Column({unique: true })
	name: string;

	@Column({default: `${process.env.SERVER_HOST}/uploads/group.jpeg`})
	avatar: string;

	@Column({nullable: true})
	description: string;

	@Column({nullable: true})
	password: string;

	@CreateDateColumn()
	createdAt: Date;

	@ManyToOne(type => User, user => user.groups)
	owner: User;
//! to check
	@OneToMany(type => Message, message => message.receiver)
	messages: Message[];
	
	@OneToMany(type => UserToGroup, usertogroup => usertogroup.group)
	usertogroup: UserToGroup[];

	@BeforeInsert()
    async hashPassword() : Promise<void> {
		if (this.privacy === Privacy.PROTECTED)
        	this.password = await bcrypt.hash(this.password, 10);
    }

	// constructor(partial : Partial<User>) {
    //     Object.assign(this, partial);
    // }
}