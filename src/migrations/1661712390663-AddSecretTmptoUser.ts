import { MigrationInterface, QueryRunner } from "typeorm";

export class AddSecretTmptoUser1661712390663 implements MigrationInterface {
    name = 'AddSecretTmptoUser1661712390663'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "secret_tmp" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "secret_tmp"`);
    }

}
