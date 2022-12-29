import { MigrationInterface, QueryRunner } from "typeorm";

export class BaseMigration1672277447987 implements MigrationInterface {
    name = 'BaseMigration1672277447987'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."usertogroup_role_enum" AS ENUM('owner', 'admin', 'member')`);
        await queryRunner.query(`CREATE TYPE "public"."usertogroup_status_enum" AS ENUM('active', 'banned', 'muted')`);
        await queryRunner.query(`CREATE TABLE "usertogroup" ("id" SERIAL NOT NULL, "role" "public"."usertogroup_role_enum" NOT NULL DEFAULT 'member', "status" "public"."usertogroup_status_enum" NOT NULL DEFAULT 'active', "until" TIMESTAMP, "userId" integer, "groupId" integer, CONSTRAINT "PK_a13f4eca20d04cb764ddb971e7d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "messages" ("id" SERIAL NOT NULL, "content" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "senderId" integer, "receiverId" integer, CONSTRAINT "PK_18325f38ae6de43878487eff986" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."groups_privacy_enum" AS ENUM('dm', 'public', 'private', 'protected')`);
        await queryRunner.query(`CREATE TABLE "groups" ("id" SERIAL NOT NULL, "privacy" "public"."groups_privacy_enum" NOT NULL DEFAULT 'public', "name" character varying NOT NULL, "avatar" character varying NOT NULL DEFAULT 'http://localhost:3000/uploads/group.jpeg', "description" character varying, "password" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "ownerId" integer, CONSTRAINT "PK_659d1483316afb28afd3a90646e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."users_provider_enum" AS ENUM('google', '42', '')`);
        await queryRunner.query(`CREATE TYPE "public"."users_status_enum" AS ENUM('online', 'offline', 'playing')`);
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "nickname" character varying NOT NULL, "username" character varying NOT NULL, "email" character varying NOT NULL, "provider" "public"."users_provider_enum" NOT NULL DEFAULT '', "twofa" boolean NOT NULL DEFAULT false, "secret_tmp" character varying, "secret" character varying, "recoveryCode" character varying, "avatar" character varying NOT NULL DEFAULT 'http://localhost:3000/uploads/avatar.png', "status" "public"."users_status_enum" NOT NULL DEFAULT 'offline', "win" integer NOT NULL DEFAULT '0', "loss" integer NOT NULL DEFAULT '0', "level" double precision NOT NULL DEFAULT '0', "coalition" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_ad02a1be8707004cb805a4b5023" UNIQUE ("nickname"), CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710" UNIQUE ("username"), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "achievments" ("id" SERIAL NOT NULL, "type" character varying NOT NULL, "icon" character varying NOT NULL, "description" character varying NOT NULL, "win" integer NOT NULL, "loss" integer NOT NULL, "level" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_d7d04156611d9693fd2f02b16b2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."games_status_enum" AS ENUM('waiting', 'playing', 'end', 'pause')`);
        await queryRunner.query(`CREATE TYPE "public"."games_mode_enum" AS ENUM('classic', 'custom')`);
        await queryRunner.query(`CREATE TABLE "games" ("id" SERIAL NOT NULL, "room" character varying, "status" "public"."games_status_enum" NOT NULL DEFAULT 'waiting', "mode" "public"."games_mode_enum" NOT NULL DEFAULT 'classic', "score1" integer NOT NULL DEFAULT '0', "score2" integer NOT NULL DEFAULT '0', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "player1Id" integer, "player2Id" integer, CONSTRAINT "PK_c9b16b62917b5595af982d66337" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users_achievments_achievments" ("usersId" integer NOT NULL, "achievmentsId" integer NOT NULL, CONSTRAINT "PK_71aec1d163fe0a9e0e14a113016" PRIMARY KEY ("usersId", "achievmentsId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_4c17b776e8a066e551443465d8" ON "users_achievments_achievments" ("usersId") `);
        await queryRunner.query(`CREATE INDEX "IDX_f4e1c0852bf0a59ab38839dd8b" ON "users_achievments_achievments" ("achievmentsId") `);
        await queryRunner.query(`CREATE TABLE "users_bloked_users" ("usersId_1" integer NOT NULL, "usersId_2" integer NOT NULL, CONSTRAINT "PK_ccca5103a5a0ec7655740faee90" PRIMARY KEY ("usersId_1", "usersId_2"))`);
        await queryRunner.query(`CREATE INDEX "IDX_db894984e6c13be211a28f4b73" ON "users_bloked_users" ("usersId_1") `);
        await queryRunner.query(`CREATE INDEX "IDX_eece87c5eb0b02abb87119601e" ON "users_bloked_users" ("usersId_2") `);
        await queryRunner.query(`CREATE TABLE "users_friends_users" ("usersId_1" integer NOT NULL, "usersId_2" integer NOT NULL, CONSTRAINT "PK_d0b93e07874c78c16bdf28a24ca" PRIMARY KEY ("usersId_1", "usersId_2"))`);
        await queryRunner.query(`CREATE INDEX "IDX_a3b73d9dd6e964868c76294b77" ON "users_friends_users" ("usersId_1") `);
        await queryRunner.query(`CREATE INDEX "IDX_6803c4075d7779e2e27d6b14c3" ON "users_friends_users" ("usersId_2") `);
        await queryRunner.query(`ALTER TABLE "usertogroup" ADD CONSTRAINT "FK_3401fb356f6be5ffbddbbdb0005" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "usertogroup" ADD CONSTRAINT "FK_5b4f66801c1a3b31c251f3447e4" FOREIGN KEY ("groupId") REFERENCES "groups"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "messages" ADD CONSTRAINT "FK_2db9cf2b3ca111742793f6c37ce" FOREIGN KEY ("senderId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "messages" ADD CONSTRAINT "FK_acf951a58e3b9611dd96ce89042" FOREIGN KEY ("receiverId") REFERENCES "groups"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "groups" ADD CONSTRAINT "FK_4d8d8897aef1c049336d8dde13f" FOREIGN KEY ("ownerId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "games" ADD CONSTRAINT "FK_75fbf4e5d917a20839c96ccda03" FOREIGN KEY ("player1Id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "games" ADD CONSTRAINT "FK_090ead4cf0688537043f35b569e" FOREIGN KEY ("player2Id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users_achievments_achievments" ADD CONSTRAINT "FK_4c17b776e8a066e551443465d82" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "users_achievments_achievments" ADD CONSTRAINT "FK_f4e1c0852bf0a59ab38839dd8bb" FOREIGN KEY ("achievmentsId") REFERENCES "achievments"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users_bloked_users" ADD CONSTRAINT "FK_db894984e6c13be211a28f4b73d" FOREIGN KEY ("usersId_1") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "users_bloked_users" ADD CONSTRAINT "FK_eece87c5eb0b02abb87119601ea" FOREIGN KEY ("usersId_2") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "users_friends_users" ADD CONSTRAINT "FK_a3b73d9dd6e964868c76294b77c" FOREIGN KEY ("usersId_1") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "users_friends_users" ADD CONSTRAINT "FK_6803c4075d7779e2e27d6b14c34" FOREIGN KEY ("usersId_2") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users_friends_users" DROP CONSTRAINT "FK_6803c4075d7779e2e27d6b14c34"`);
        await queryRunner.query(`ALTER TABLE "users_friends_users" DROP CONSTRAINT "FK_a3b73d9dd6e964868c76294b77c"`);
        await queryRunner.query(`ALTER TABLE "users_bloked_users" DROP CONSTRAINT "FK_eece87c5eb0b02abb87119601ea"`);
        await queryRunner.query(`ALTER TABLE "users_bloked_users" DROP CONSTRAINT "FK_db894984e6c13be211a28f4b73d"`);
        await queryRunner.query(`ALTER TABLE "users_achievments_achievments" DROP CONSTRAINT "FK_f4e1c0852bf0a59ab38839dd8bb"`);
        await queryRunner.query(`ALTER TABLE "users_achievments_achievments" DROP CONSTRAINT "FK_4c17b776e8a066e551443465d82"`);
        await queryRunner.query(`ALTER TABLE "games" DROP CONSTRAINT "FK_090ead4cf0688537043f35b569e"`);
        await queryRunner.query(`ALTER TABLE "games" DROP CONSTRAINT "FK_75fbf4e5d917a20839c96ccda03"`);
        await queryRunner.query(`ALTER TABLE "groups" DROP CONSTRAINT "FK_4d8d8897aef1c049336d8dde13f"`);
        await queryRunner.query(`ALTER TABLE "messages" DROP CONSTRAINT "FK_acf951a58e3b9611dd96ce89042"`);
        await queryRunner.query(`ALTER TABLE "messages" DROP CONSTRAINT "FK_2db9cf2b3ca111742793f6c37ce"`);
        await queryRunner.query(`ALTER TABLE "usertogroup" DROP CONSTRAINT "FK_5b4f66801c1a3b31c251f3447e4"`);
        await queryRunner.query(`ALTER TABLE "usertogroup" DROP CONSTRAINT "FK_3401fb356f6be5ffbddbbdb0005"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_6803c4075d7779e2e27d6b14c3"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_a3b73d9dd6e964868c76294b77"`);
        await queryRunner.query(`DROP TABLE "users_friends_users"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_eece87c5eb0b02abb87119601e"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_db894984e6c13be211a28f4b73"`);
        await queryRunner.query(`DROP TABLE "users_bloked_users"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_f4e1c0852bf0a59ab38839dd8b"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_4c17b776e8a066e551443465d8"`);
        await queryRunner.query(`DROP TABLE "users_achievments_achievments"`);
        await queryRunner.query(`DROP TABLE "games"`);
        await queryRunner.query(`DROP TYPE "public"."games_mode_enum"`);
        await queryRunner.query(`DROP TYPE "public"."games_status_enum"`);
        await queryRunner.query(`DROP TABLE "achievments"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TYPE "public"."users_status_enum"`);
        await queryRunner.query(`DROP TYPE "public"."users_provider_enum"`);
        await queryRunner.query(`DROP TABLE "groups"`);
        await queryRunner.query(`DROP TYPE "public"."groups_privacy_enum"`);
        await queryRunner.query(`DROP TABLE "messages"`);
        await queryRunner.query(`DROP TABLE "usertogroup"`);
        await queryRunner.query(`DROP TYPE "public"."usertogroup_status_enum"`);
        await queryRunner.query(`DROP TYPE "public"."usertogroup_role_enum"`);
    }

}
