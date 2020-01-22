import {MigrationInterface, QueryRunner} from "typeorm";

export class migration1579605855363 implements MigrationInterface {
    name = 'migration1579605855363'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "campus" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "address" character varying NOT NULL, "webUrl" character varying NOT NULL, "calendarUrl" character varying NOT NULL, CONSTRAINT "PK_150aa1747b3517c47f9bd98ea6d" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "phoneNumber" character varying NOT NULL, "bio" character varying, "stripeSubId" character varying, "isAdmin" boolean NOT NULL DEFAULT false, "isMember" boolean NOT NULL DEFAULT false, "isFellow" boolean NOT NULL DEFAULT false, "receivedFellowshipAt" TIMESTAMP, "campusId" uuid, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "application" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "text" character varying NOT NULL, "status" integer NOT NULL, CONSTRAINT "PK_569e0c3e863ebdf5f2408ee1670" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_294704357112789876bfcf05468" FOREIGN KEY ("campusId") REFERENCES "campus"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_294704357112789876bfcf05468"`, undefined);
        await queryRunner.query(`DROP TABLE "application"`, undefined);
        await queryRunner.query(`DROP TABLE "user"`, undefined);
        await queryRunner.query(`DROP TABLE "campus"`, undefined);
    }

}
