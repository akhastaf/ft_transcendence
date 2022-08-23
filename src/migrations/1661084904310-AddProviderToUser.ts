import { MigrationInterface, QueryRunner } from "typeorm";

export class AddProviderToUser1661084904310 implements MigrationInterface {
    name = 'AddProviderToUser1661084904310'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."user_provider_enum" AS ENUM('google', '42', '')`);
        await queryRunner.query(`ALTER TABLE "user" ADD "provider" "public"."user_provider_enum" NOT NULL DEFAULT ''`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "provider"`);
        await queryRunner.query(`DROP TYPE "public"."user_provider_enum"`);
    }

}
