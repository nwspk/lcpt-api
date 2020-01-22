import {MigrationInterface, QueryRunner} from "typeorm";

export class migration1579700352964 implements MigrationInterface {
    name = 'migration1579700352964'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "user" ADD "email" character varying`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "email"`, undefined);
    }

}
