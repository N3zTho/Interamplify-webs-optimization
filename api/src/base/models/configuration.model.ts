import {Table, Column, Model, DataType, CreatedAt, UpdatedAt, BelongsTo} from 'sequelize-typescript';

@Table({
    tableName: "configs"
})
export class Configuration extends Model {
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
    key: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    value: string;

    @Column({
        field: "id_usuario",
        type: DataType.BIGINT.UNSIGNED,
        allowNull: false,
    })
    user_id: bigint;

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
