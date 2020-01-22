import {MigrationInterface, QueryRunner} from "typeorm";

export class migration1579612892196 implements MigrationInterface {
    name = 'migration1579612892196'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "campus" ADD "deanId" uuid`, undefined);
        await queryRunner.query(`ALTER TABLE "campus" ADD CONSTRAINT "FK_f5b20978e4e90a8f74a7824b1a3" FOREIGN KEY ("deanId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "campus" DROP CONSTRAINT "FK_f5b20978e4e90a8f74a7824b1a3"`, undefined);
        await queryRunner.query(`ALTER TABLE "campus" DROP COLUMN "deanId"`, undefined);
    }

}
