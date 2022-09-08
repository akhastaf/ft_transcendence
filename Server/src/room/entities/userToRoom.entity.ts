import { User } from "src/user/entities/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Room } from "./room.entity";

@Entity()
export class UserToRoom {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    userId: number;
    @Column()
    roomId: number;
    @Column()
    isbaned: boolean;
    @Column()
    ismuted: boolean;
    @Column()
    untill: Date;

    @ManyToOne(() => User, (user) => user.userToRoom)
    user: User;
    @ManyToOne(() => Room, (room) => room.userToRoom)
    room: Room;
    @CreateDateColumn()
    createdAt: Date;
    @UpdateDateColumn()
    updatedAt: Date;
}