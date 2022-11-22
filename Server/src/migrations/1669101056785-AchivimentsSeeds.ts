import { Achievment } from "src/achievment/entities/achievment.entity"
import { MigrationInterface, QueryRunner } from "typeorm"
import { AchievmentSeed } from "./seeds/achievment.seed";

export class AchivimentsSeeds1669101056785 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const achivments = queryRunner.manager.getRepository(Achievment).create(AchievmentSeed);
        await queryRunner.manager.getRepository(Achievment).save(achivments);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.clearTable('achievment');
    }

}
