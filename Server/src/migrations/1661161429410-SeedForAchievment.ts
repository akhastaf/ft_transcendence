import { Achievment } from "src/achievment/entities/achievment.entity";
import { MigrationInterface, QueryRunner } from "typeorm"
import { AchievmentSeed } from "./seeds/achievment.seed";

export class SeedForAchievment1661161429410 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        queryRunner.manager.insert<Achievment>('achievment',AchievmentSeed);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.clearTable('achievment');
    }

}
