import { User } from "src/user/entities/user.entity";
import { CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn, Column, ManyToOne, JoinTable } from "typeorm";

export enum GameStatus {
    WAITING = 'waiting',
    PLAYING = 'playing',
    END = 'end',
    PAUSE = 'pause'
}

export enum GameMode {
    CLASSIC = 'classic',
    CUSTOM = 'custom'
}


@Entity()
export class Game {
    @PrimaryGeneratedColumn()
    id: number;
    @Column({nullable: true})
    room: string;
    @Column({
        type: 'enum',
        enum: GameStatus,
        default: GameStatus.WAITING,
    })
    status: string;
    @Column({
        type: 'enum',
        enum: GameMode,
        default: GameMode.CLASSIC,
    })
    mode: string;
    @Column({ default: 0})
    score1: number;
    @Column({ default: 0})
    score2: number;
    @ManyToOne(()=> User, { eager: true, onDelete: 'CASCADE'})
    @JoinTable()
    player1?: User;
    @ManyToOne(()=> User, { eager: true, onDelete: 'CASCADE'})
    @JoinTable()
    player2?: User;
    @CreateDateColumn()
    createdAt: Date;
    @UpdateDateColumn()
    updatedAt: Date;
}