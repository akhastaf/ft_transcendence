import { Game } from "src/game/entites/game.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class GameState {
    @PrimaryGeneratedColumn()
    id: number;
    @Column({ default: 0})
    score1: number;
    @Column({ default: 0})
    score2: number;
    @ManyToOne(() => Game, (game) => game.gameStates)
    game: Game;
    @CreateDateColumn()
    createdAt: Date;
    @UpdateDateColumn()
    updatedAt: Date;
}