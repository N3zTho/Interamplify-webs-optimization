import {Table, Column, Model, DataType, CreatedAt, UpdatedAt} from 'sequelize-typescript';

@Table({
    tableName: "gestor"
})
export class Gestor extends Model {
    @Column({
        type: DataType.BIGINT.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    })
    id: bigint;

    @Column({
        type: DataType.BIGINT.UNSIGNED,
        allowNull: false,
    })
    id_persona: bigint;

    @Column({
        type: DataType.BIGINT.UNSIGNED,
        allowNull: false,
    })
    id_usuario: bigint;

    @Column
    is_agency: boolean;

    @Column
    plataforma: boolean;

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
