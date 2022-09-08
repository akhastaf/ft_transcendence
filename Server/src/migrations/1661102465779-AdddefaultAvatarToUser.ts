import { MigrationInterface, QueryRunner } from "typeorm";

export class AdddefaultAvatarToUser1661102465779 implements MigrationInterface {
    name = 'AdddefaultAvatarToUser1661102465779'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "avatar" SET DEFAULT '/avatar.png'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "avatar" DROP DEFAULT`);
    }

}
