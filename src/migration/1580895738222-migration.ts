import {MigrationInterface, QueryRunner} from "typeorm";

export class migration1580895738222 implements MigrationInterface {
    name = 'migration1580895738222'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "campus" ALTER COLUMN "address" DROP NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "campus" ALTER COLUMN "calendarUrl" DROP NOT NULL`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "campus" ALTER COLUMN "calendarUrl" SET NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "campus" ALTER COLUMN "address" SET NOT NULL`, undefined);
    }

}
