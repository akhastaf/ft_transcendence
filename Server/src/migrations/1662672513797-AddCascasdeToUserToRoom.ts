import { MigrationInterface, QueryRunner } from "typeorm";

export class AddCascasdeToUserToRoom1662672513797 implements MigrationInterface {
    name = 'AddCascasdeToUserToRoom1662672513797'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_to_room" DROP CONSTRAINT "FK_94cc53b888ff83b98a700f219ae"`);
        await queryRunner.query(`ALTER TABLE "user_to_room" ADD CONSTRAINT "FK_94cc53b888ff83b98a700f219ae" FOREIGN KEY ("roomId") REFERENCES "room"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_to_room" DROP CONSTRAINT "FK_94cc53b888ff83b98a700f219ae"`);
        await queryRunner.query(`ALTER TABLE "user_to_room" ADD CONSTRAINT "FK_94cc53b888ff83b98a700f219ae" FOREIGN KEY ("roomId") REFERENCES "room"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
