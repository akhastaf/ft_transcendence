import { MigrationInterface, QueryRunner } from "typeorm";

export class RemoveTestFromRoom1661194363211 implements MigrationInterface {
    name = 'RemoveTestFromRoom1661194363211'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "room" DROP COLUMN "test"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "room" ADD "test" character varying NOT NULL`);
    }

}
