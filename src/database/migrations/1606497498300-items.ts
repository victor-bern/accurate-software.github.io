import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class items1606497498300 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "items",
                columns: [
                    {
                        name: 'id',
                        type: 'serial',
                        isPrimary: true,
                        generationStrategy: 'increment',

                    },
                    {
                        name: 'name',
                        type: 'varchar',
                        isNullable: false,
                    },
                    {
                        name: 'category',
                        type: 'varchar',
                        isNullable: false,
                    },
                    {
                        name: "situation",
                        type: "integer",
                        default: 0
                    },
                    {
                        name: 'localization',
                        type: 'varchar',
                        isNullable: false,
                    },
                    {
                        name: 'photo',
                        type: 'varchar',
                        isNullable: false,
                    },
                    {
                        name: 'created_at',
                        type: 'timestamp',
                        default: 'now()',
                    },
                    {
                        name: 'updated_at',
                        isNullable: true,
                        type: 'timestamp',
                        default: 'null',
                        onUpdate: 'now()'
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('items');
    }

}
