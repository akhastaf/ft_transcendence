import { User } from "src/user/entities/user.entity";
import { MigrationInterface, QueryRunner } from "typeorm"
import { ComputerSeed } from "./seeds/computer.seed";

export class SeedForUserComputer1672277495847 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const computer = queryRunner.manager.getRepository(User).create(ComputerSeed);
        await queryRunner.manager.getRepository(User).save(computer);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // await queryRunner.clearTable('achievment');
    }

}
