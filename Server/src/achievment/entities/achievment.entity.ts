import { User } from "src/user/entities/user.entity";
import { Column, CreateDateColumn, Entity, ManyToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Achievment {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    type: string;
    @Column()
    icon: string;
    @Column()
    description: string;
    @Column()
    win: number;
    @Column()
    loss: number;
    @Column()
    level: number;

    @ManyToMany(() => User, (user) => user.achievments)
    users: User[];
    
    @CreateDateColumn()
    createdAt: Date;
    @UpdateDateColumn()
    updatedAt: Date;
}