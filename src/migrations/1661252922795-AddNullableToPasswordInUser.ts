import { MigrationInterface, QueryRunner } from "typeorm";

export class AddNullableToPasswordInUser1661252922795 implements MigrationInterface {
    name = 'AddNullableToPasswordInUser1661252922795'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "password" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "password" SET NOT NULL`);
    }

}
