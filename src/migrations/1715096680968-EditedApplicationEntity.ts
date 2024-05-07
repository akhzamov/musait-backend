import { MigrationInterface, QueryRunner } from "typeorm";

export class EditedApplicationEntity1715096680968 implements MigrationInterface {
    name = 'EditedApplicationEntity1715096680968'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "application" ALTER COLUMN "email" SET DEFAULT ''`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "application" ALTER COLUMN "email" DROP DEFAULT`);
    }

}
