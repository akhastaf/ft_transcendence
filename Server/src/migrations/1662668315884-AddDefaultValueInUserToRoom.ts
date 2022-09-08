import { MigrationInterface, QueryRunner } from "typeorm";

export class AddDefaultValueInUserToRoom1662668315884 implements MigrationInterface {
    name = 'AddDefaultValueInUserToRoom1662668315884'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_to_room" ALTER COLUMN "isbaned" SET DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "user_to_room" ALTER COLUMN "ismuted" SET DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "user_to_room" ALTER COLUMN "untill" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_to_room" ALTER COLUMN "untill" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user_to_room" ALTER COLUMN "ismuted" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "user_to_room" ALTER COLUMN "isbaned" DROP DEFAULT`);
    }

}
