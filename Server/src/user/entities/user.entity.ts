import { Exclude } from "class-transformer";
import { Achievment } from "src/achievment/entities/achievment.entity";
import { Group } from "src/messages/entities/group.entity";
import { Message } from "src/messages/entities/message.entity";
import { UserToGroup } from "src/messages/entities/usertogroup.entity";
import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import * as dotenv from "dotenv";
dotenv.config({ path: __dirname+'/../../../.env' });

export enum Userstatus {
    ONLINE = "online",
    OFFLINE = "offline",
    PLAYING = "playing",
}

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id: number;
    @Column({ unique: true})
    nickname: string;
    @Column({ unique: true})
    username: string;
    @Column({ unique: true })
    email: string;
    @Column({default: false})
    twofa: boolean;
    @Column({nullable: true})
    @Exclude()
    secret_tmp: string;
    @Column({nullable: true})
    @Exclude()
    secret: string;
    @Column({nullable: true})
    @Exclude()
    recoveryCode: string;
    @Column({ default: `${process.env.SERVER_HOST}/uploads/avatar.png`})
    avatar: string;
    @Column( {
        type: "enum",
        enum: Userstatus,
        default: Userstatus.OFFLINE,
    })
    status: string;
    @Column({default: 0})
    win: number;
    @Column({default: 0})
    loss: number;
    @Column({default: 0, type: 'float'})
    level: number;
    
    @ManyToMany(() => Achievment, (achievment) => achievment.users)
    @JoinTable()
    achievments: Achievment[];
    
    @ManyToMany(() => User, { cascade: true })
    @JoinTable()
    bloked: User[];


    @OneToMany(() => Message, message => message.sender)
	messages: Message[];
	@OneToMany(() => Group, group => group.owner, { onDelete: 'CASCADE' })
	groups: Group[];
	@OneToMany(() => UserToGroup, usertogroup => usertogroup.user)
	usertogroup: UserToGroup[];

	@ManyToMany(() => User, { cascade: true })
    @JoinTable()
    friends: User[];
    @CreateDateColumn()
    createdAt: Date;
    @UpdateDateColumn()
    updatedAt: Date;


    constructor(partial: Partial<User>) {
        Object.assign(this, partial);
    }
}