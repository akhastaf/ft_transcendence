import { MigrationInterface, QueryRunner } from "typeorm";

export class RemoveTestFromMessage1661167670698 implements MigrationInterface {
    name = 'RemoveTestFromMessage1661167670698'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "message" DROP COLUMN "test"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "message" ADD "test" character varying NOT NULL`);
    }

}
