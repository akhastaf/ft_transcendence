import { MigrationInterface, QueryRunner } from "typeorm";

export class AddNullableForRoomGameInGame1661175991234 implements MigrationInterface {
    name = 'AddNullableForRoomGameInGame1661175991234'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "game" ALTER COLUMN "roomGame" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "game" ALTER COLUMN "roomGame" SET NOT NULL`);
    }
}
