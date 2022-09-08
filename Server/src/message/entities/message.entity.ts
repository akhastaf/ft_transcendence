import { Room } from "src/room/entities/room.entity";
import { User } from "src/user/entities/user.entity";
import { CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn, Column, ManyToOne} from "typeorm";

@Entity()
export class Message {
    @PrimaryGeneratedColumn()
    id: number;
    @Column({type: "text"})
    content: string;
    @ManyToOne(() => User, { onDelete:'SET NULL'})
    sender: User;
    @ManyToOne(() => Room, (room) => room.messages, { onDelete: 'CASCADE'})
    room: Room;
    @CreateDateColumn()
    createdAt: Date;
    @UpdateDateColumn()
    updatedAt: Date;
}