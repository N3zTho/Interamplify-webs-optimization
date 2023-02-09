import {Table, Column, Model, DataType, CreatedAt, UpdatedAt} from 'sequelize-typescript';

@Table({
    tableName: "divisa"
})
export class Currency extends Model {
    @Column({
        type: DataType.BIGINT.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    })
    id: bigint;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    name: string;

    @Column({
        type: DataType.STRING(3),
        allowNull: false,
    })
    code: string;

    @Column({
        type: DataType.STRING(5),
        allowNull: false,
    })
    symbol: string;

    @Column({
        type: DataType.DECIMAL(8, 5),
    })
    usd: number;

    @Column({
        type: DataType.DECIMAL(8, 5),
    })
    usd_before: number;

    @Column({
        type: DataType.DECIMAL(8, 5),
    })
    eur: number;

    @Column({
        type: DataType.DECIMAL(8, 5),
    })
    eur_before: number;

    @Column({
        type: DataType.DECIMAL(8, 5),
    })
    gbp: number;

    @Column({
        type: DataType.DECIMAL(8, 5),
    })
    gbp_before: number;

    @Column({
        type: DataType.DECIMAL(8, 5),
    })
    mxn: number;

    @Column({
        type: DataType.DECIMAL(8, 5),
    })
    mxn_before: number;

    @CreatedAt
    @Column({
        field: "created_at",
        type: DataType.DATE
    })
    createdAt: Date;

    @UpdatedAt
    @Column({
        field: "updated_at",
        type: DataType.DATE
    })
    updatedAt: Date;
}
