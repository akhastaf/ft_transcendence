import { MigrationInterface, QueryRunner } from "typeorm";

export class BaseMigration1663952588145 implements MigrationInterface {
    name = 'BaseMigration1663952588145'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "game_state" ("id" SERIAL NOT NULL, "score1" integer NOT NULL DEFAULT '0', "score2" integer NOT NULL DEFAULT '0', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "gameId" integer, CONSTRAINT "PK_e7b8f9fb87d56841a7aaa284f52" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "achievment" ("id" SERIAL NOT NULL, "type" character varying NOT NULL, "icon" character varying NOT NULL, "description" character varying NOT NULL, "win" integer NOT NULL, "loss" integer NOT NULL, "level" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_fccc6600fd1497e19c69edb8afe" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "message" ("id" SERIAL NOT NULL, "content" text NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "senderId" integer, "roomId" integer, CONSTRAINT "PK_ba01f0a3e0123651915008bc578" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user_to_room" ("id" SERIAL NOT NULL, "userId" integer NOT NULL, "roomId" integer NOT NULL, "isbaned" boolean NOT NULL DEFAULT false, "ismuted" boolean NOT NULL DEFAULT false, "untill" TIMESTAMP, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_0a915452ea2d5f787f580c6ab5f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "room" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "private" boolean NOT NULL DEFAULT false, "password" character varying DEFAULT false, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "createdById" integer, CONSTRAINT "PK_c6d46db005d623e691b2fbcba23" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."user_provider_enum" AS ENUM('google', '42', '')`);
        await queryRunner.query(`CREATE TYPE "public"."user_status_enum" AS ENUM('online', 'offline', 'playing')`);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "username" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying, "provider" "public"."user_provider_enum" NOT NULL DEFAULT '', "twofa" boolean NOT NULL DEFAULT false, "secret_tmp" character varying, "secret" character varying, "recoveryCode" character varying, "avatar" character varying NOT NULL DEFAULT '/avatar.png', "status" "public"."user_status_enum" NOT NULL DEFAULT 'offline', "win" integer NOT NULL DEFAULT '0', "loss" integer NOT NULL DEFAULT '0', "level" integer NOT NULL DEFAULT '0', "coalition" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username"), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "game" ("id" SERIAL NOT NULL, "score1" integer NOT NULL DEFAULT '0', "score2" integer NOT NULL DEFAULT '0', "isRunning" boolean NOT NULL DEFAULT false, "roomGame" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "player1Id" integer, "player2Id" integer, CONSTRAINT "PK_352a30652cd352f552fef73dec5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "room_adminstartors_user" ("roomId" integer NOT NULL, "userId" integer NOT NULL, CONSTRAINT "PK_04433c952f314e533165feae63a" PRIMARY KEY ("roomId", "userId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_7b746049f1b390760fc0be1e54" ON "room_adminstartors_user" ("roomId") `);
        await queryRunner.query(`CREATE INDEX "IDX_72022a3e444a23d534a49e365b" ON "room_adminstartors_user" ("userId") `);
        await queryRunner.query(`CREATE TABLE "user_achievments_achievment" ("userId" integer NOT NULL, "achievmentId" integer NOT NULL, CONSTRAINT "PK_03e4ddb057e46edde0288880c2a" PRIMARY KEY ("userId", "achievmentId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_45d5f2a0e7d20c45ebf2091cb9" ON "user_achievments_achievment" ("userId") `);
        await queryRunner.query(`CREATE INDEX "IDX_e8b2e866c6232504ac0922c398" ON "user_achievments_achievment" ("achievmentId") `);
        await queryRunner.query(`CREATE TABLE "user_friends_user" ("userId_1" integer NOT NULL, "userId_2" integer NOT NULL, CONSTRAINT "PK_f2b5631d91f6b7fda632135932f" PRIMARY KEY ("userId_1", "userId_2"))`);
        await queryRunner.query(`CREATE INDEX "IDX_04840fd160b733de706a336013" ON "user_friends_user" ("userId_1") `);
        await queryRunner.query(`CREATE INDEX "IDX_e81f236c989f3fd54836b50a12" ON "user_friends_user" ("userId_2") `);
        await queryRunner.query(`CREATE TABLE "user_bloked_user" ("userId_1" integer NOT NULL, "userId_2" integer NOT NULL, CONSTRAINT "PK_5692edde94128cea8a2b0e30574" PRIMARY KEY ("userId_1", "userId_2"))`);
        await queryRunner.query(`CREATE INDEX "IDX_218022825ff8b45ceb402ee7b4" ON "user_bloked_user" ("userId_1") `);
        await queryRunner.query(`CREATE INDEX "IDX_be9d65d2e3ce1d773fab16ac95" ON "user_bloked_user" ("userId_2") `);
        await queryRunner.query(`ALTER TABLE "game_state" ADD CONSTRAINT "FK_dc92896f0725c0cf0127b50eb92" FOREIGN KEY ("gameId") REFERENCES "game"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "message" ADD CONSTRAINT "FK_bc096b4e18b1f9508197cd98066" FOREIGN KEY ("senderId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "message" ADD CONSTRAINT "FK_fdfe54a21d1542c564384b74d5c" FOREIGN KEY ("roomId") REFERENCES "room"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_to_room" ADD CONSTRAINT "FK_96a7cd0440b1cac2d4aae646f75" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_to_room" ADD CONSTRAINT "FK_94cc53b888ff83b98a700f219ae" FOREIGN KEY ("roomId") REFERENCES "room"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "room" ADD CONSTRAINT "FK_73fcab8a989c1a6f60565fc6dbf" FOREIGN KEY ("createdById") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "game" ADD CONSTRAINT "FK_7b7f91302f66ab534423c96aa34" FOREIGN KEY ("player1Id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "game" ADD CONSTRAINT "FK_3b85329cbe5b9f9002f05018faf" FOREIGN KEY ("player2Id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "room_adminstartors_user" ADD CONSTRAINT "FK_7b746049f1b390760fc0be1e54b" FOREIGN KEY ("roomId") REFERENCES "room"("id") ON DELETE SET NULL ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "room_adminstartors_user" ADD CONSTRAINT "FK_72022a3e444a23d534a49e365b3" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "user_achievments_achievment" ADD CONSTRAINT "FK_45d5f2a0e7d20c45ebf2091cb9a" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "user_achievments_achievment" ADD CONSTRAINT "FK_e8b2e866c6232504ac0922c3987" FOREIGN KEY ("achievmentId") REFERENCES "achievment"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_friends_user" ADD CONSTRAINT "FK_04840fd160b733de706a3360134" FOREIGN KEY ("userId_1") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "user_friends_user" ADD CONSTRAINT "FK_e81f236c989f3fd54836b50a12d" FOREIGN KEY ("userId_2") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_bloked_user" ADD CONSTRAINT "FK_218022825ff8b45ceb402ee7b47" FOREIGN KEY ("userId_1") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "user_bloked_user" ADD CONSTRAINT "FK_be9d65d2e3ce1d773fab16ac950" FOREIGN KEY ("userId_2") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_bloked_user" DROP CONSTRAINT "FK_be9d65d2e3ce1d773fab16ac950"`);
        await queryRunner.query(`ALTER TABLE "user_bloked_user" DROP CONSTRAINT "FK_218022825ff8b45ceb402ee7b47"`);
        await queryRunner.query(`ALTER TABLE "user_friends_user" DROP CONSTRAINT "FK_e81f236c989f3fd54836b50a12d"`);
        await queryRunner.query(`ALTER TABLE "user_friends_user" DROP CONSTRAINT "FK_04840fd160b733de706a3360134"`);
        await queryRunner.query(`ALTER TABLE "user_achievments_achievment" DROP CONSTRAINT "FK_e8b2e866c6232504ac0922c3987"`);
        await queryRunner.query(`ALTER TABLE "user_achievments_achievment" DROP CONSTRAINT "FK_45d5f2a0e7d20c45ebf2091cb9a"`);
        await queryRunner.query(`ALTER TABLE "room_adminstartors_user" DROP CONSTRAINT "FK_72022a3e444a23d534a49e365b3"`);
        await queryRunner.query(`ALTER TABLE "room_adminstartors_user" DROP CONSTRAINT "FK_7b746049f1b390760fc0be1e54b"`);
        await queryRunner.query(`ALTER TABLE "game" DROP CONSTRAINT "FK_3b85329cbe5b9f9002f05018faf"`);
        await queryRunner.query(`ALTER TABLE "game" DROP CONSTRAINT "FK_7b7f91302f66ab534423c96aa34"`);
        await queryRunner.query(`ALTER TABLE "room" DROP CONSTRAINT "FK_73fcab8a989c1a6f60565fc6dbf"`);
        await queryRunner.query(`ALTER TABLE "user_to_room" DROP CONSTRAINT "FK_94cc53b888ff83b98a700f219ae"`);
        await queryRunner.query(`ALTER TABLE "user_to_room" DROP CONSTRAINT "FK_96a7cd0440b1cac2d4aae646f75"`);
        await queryRunner.query(`ALTER TABLE "message" DROP CONSTRAINT "FK_fdfe54a21d1542c564384b74d5c"`);
        await queryRunner.query(`ALTER TABLE "message" DROP CONSTRAINT "FK_bc096b4e18b1f9508197cd98066"`);
        await queryRunner.query(`ALTER TABLE "game_state" DROP CONSTRAINT "FK_dc92896f0725c0cf0127b50eb92"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_be9d65d2e3ce1d773fab16ac95"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_218022825ff8b45ceb402ee7b4"`);
        await queryRunner.query(`DROP TABLE "user_bloked_user"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_e81f236c989f3fd54836b50a12"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_04840fd160b733de706a336013"`);
        await queryRunner.query(`DROP TABLE "user_friends_user"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_e8b2e866c6232504ac0922c398"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_45d5f2a0e7d20c45ebf2091cb9"`);
        await queryRunner.query(`DROP TABLE "user_achievments_achievment"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_72022a3e444a23d534a49e365b"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_7b746049f1b390760fc0be1e54"`);
        await queryRunner.query(`DROP TABLE "room_adminstartors_user"`);
        await queryRunner.query(`DROP TABLE "game"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TYPE "public"."user_status_enum"`);
        await queryRunner.query(`DROP TYPE "public"."user_provider_enum"`);
        await queryRunner.query(`DROP TABLE "room"`);
        await queryRunner.query(`DROP TABLE "user_to_room"`);
        await queryRunner.query(`DROP TABLE "message"`);
        await queryRunner.query(`DROP TABLE "achievment"`);
        await queryRunner.query(`DROP TABLE "game_state"`);
    }

}
