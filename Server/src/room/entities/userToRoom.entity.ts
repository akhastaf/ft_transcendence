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
    @Column({default: false})
    isbaned: boolean;
    @Column({default: false})
    ismuted: boolean;
    @Column({nullable: true})
    untill: Date;

    @ManyToOne(() => User, (user) => user.userToRoom)
    user: User;
    @ManyToOne(() => Room, (room) => room.userToRoom, {onDelete: 'CASCADE'})
    room: Room;
    @CreateDateColumn()
    createdAt: Date;
    @UpdateDateColumn()
    updatedAt: Date;
}