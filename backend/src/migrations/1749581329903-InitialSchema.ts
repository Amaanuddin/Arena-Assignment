import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialSchema1749581329903 implements MigrationInterface {
    name = 'InitialSchema1749581329903'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "likes" ("post_id" integer NOT NULL, "wallet_address" character varying NOT NULL, CONSTRAINT "PK_3949169ac4a2148f638bd2d68b4" PRIMARY KEY ("post_id", "wallet_address"))`);
        await queryRunner.query(`CREATE TABLE "comments" ("id" SERIAL NOT NULL, "post_id" integer NOT NULL, "wallet_address" character varying NOT NULL, "content" character varying(280) NOT NULL, "timestamp" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_8bf68bc960f2b69e818bdb90dcb" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "posts" ("id" SERIAL NOT NULL, "wallet_address" character varying NOT NULL, "content" character varying(280) NOT NULL, "timestamp" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_2829ac61eff60fcec60d7274b9e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("wallet_address" character varying NOT NULL, "username" character varying, "bio" character varying, "profile_pic_url" character varying, CONSTRAINT "PK_196ef3e52525d3cd9e203bdb1de" PRIMARY KEY ("wallet_address"))`);
        await queryRunner.query(`ALTER TABLE "likes" ADD CONSTRAINT "FK_741df9b9b72f328a6d6f63e79ff" FOREIGN KEY ("post_id") REFERENCES "posts"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "likes" ADD CONSTRAINT "FK_e8982b8b6a2740e0fb016950749" FOREIGN KEY ("wallet_address") REFERENCES "users"("wallet_address") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comments" ADD CONSTRAINT "FK_259bf9825d9d198608d1b46b0b5" FOREIGN KEY ("post_id") REFERENCES "posts"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comments" ADD CONSTRAINT "FK_aa525e93bd36a95657a58c9d2f2" FOREIGN KEY ("wallet_address") REFERENCES "users"("wallet_address") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "posts" ADD CONSTRAINT "FK_cfe48313aa3abc06bf5cd28eeed" FOREIGN KEY ("wallet_address") REFERENCES "users"("wallet_address") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "posts" DROP CONSTRAINT "FK_cfe48313aa3abc06bf5cd28eeed"`);
        await queryRunner.query(`ALTER TABLE "comments" DROP CONSTRAINT "FK_aa525e93bd36a95657a58c9d2f2"`);
        await queryRunner.query(`ALTER TABLE "comments" DROP CONSTRAINT "FK_259bf9825d9d198608d1b46b0b5"`);
        await queryRunner.query(`ALTER TABLE "likes" DROP CONSTRAINT "FK_e8982b8b6a2740e0fb016950749"`);
        await queryRunner.query(`ALTER TABLE "likes" DROP CONSTRAINT "FK_741df9b9b72f328a6d6f63e79ff"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "posts"`);
        await queryRunner.query(`DROP TABLE "comments"`);
        await queryRunner.query(`DROP TABLE "likes"`);
    }

}
