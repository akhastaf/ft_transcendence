import { Achievment } from "src/achievment/entities/achievment.entity";
import { Game } from "src/game/entites/game.entity";
import { Group } from "src/messages/entities/group.entity";
import { Message } from "src/messages/entities/message.entity";
import { UserToGroup } from "src/messages/entities/usertogroup.entity";
import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

export enum Userstatus {
    ONLINE = "online",
    OFFLINE = "offline",
    PLAYING = "playing",
}
export enum UserProvider {
    GOOGLE = "google",
    FT = "42",
    NONE = ""
}

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;
    @Column({ unique: true})
    username: string;
    @Column({ unique: true })
    email: string;
    @Column({nullable: true})
    password?: string;
    @Column({
        type: "enum",
        enum: UserProvider,
        default: UserProvider.NONE,
    })
    provider: string;
    @Column({default: false})
    twofa: boolean;
    @Column({nullable: true})
    secret_tmp: string;
    @Column({nullable: true})
    secret: string;
    @Column({nullable: true})
    recoveryCode: string;
    @Column({ default: "/avatar.png"})
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
    @Column({default: 0})
    level: number;

    @Column({nullable: true})
    coalition: string;
    
    @ManyToMany(() => Achievment, (achievment) => achievment.users)
    @JoinTable()
    achievments: Achievment[];
    
    @ManyToMany(() => User, (user) => user.bloked)
    @JoinTable()
    bloked: User[];
    
    //@OneToMany(() => Game, (game) =>game.player1)
    @OneToMany(() => Game, (game) =>game.player1)
    gamesAsFirst: Game[];
    @OneToMany(() => Game, (game) =>game.player2)
    gamesAsSecond: Game[];


    @OneToMany(() => Message, message => message.sender)
	messages: Message[];
	@OneToMany(() => Group, group => group.owner)
	groups: Group[];
	@OneToMany(() => UserToGroup, usertogroup => usertogroup.user)
	usertogroup: UserToGroup[];

	@ManyToMany(() => User, (user) => user.friends)
    @JoinTable()
    friends: User[];
    @ManyToMany(() => User, (user) => user.userfriends)
    userfriends: User[];

    @CreateDateColumn()
    createdAt: Date;
    @UpdateDateColumn()
    updatedAt: Date;
}