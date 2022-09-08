import { Message } from "src/message/entities/message.entity";
import { User } from "src/user/entities/user.entity";
import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { UserToRoom } from "./userToRoom.entity";

@Entity()
export class Room {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    name: string;
    @Column({ default: false})
    private: boolean;
    @Column({ nullable: true, default: false})
    password: string;
    @ManyToOne(() => User, (user) => user.rooms, { onDelete: 'SET NULL'})
    createdBy: User;
    @ManyToMany(() => User, { onDelete: 'SET NULL'})
    @JoinTable()
    adminstartors: User[];
    @OneToMany(() => UserToRoom, (userToRoom) => userToRoom.room ,{ onDelete: 'SET NULL'})
    userToRoom!: UserToRoom[];
    @OneToMany(() => Message, (message) => message.room, {onDelete: 'SET NULL'})
    messages: Message[];
    @CreateDateColumn()
    createdAt: Date;
    @UpdateDateColumn()
    updatedAt: Date;
}

// select * from user where user.username = $1 and user.password = $2, test 1=1'