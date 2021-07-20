import {Table, Column, Model, DataType, CreatedAt, UpdatedAt} from 'sequelize-typescript';

@Table({
    tableName: "usuario"
})
export class User extends Model {
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
    avatar: string;

    @Column({
        type: DataType.STRING(255),
        allowNull: false,
    })
    login: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    password: string;

    @Column({
        type: DataType.STRING(255),
        allowNull: false,
    })
    roles: string;

    @Column({
        type: DataType.STRING(120),
    })
    email: string;

    @Column({
        type: DataType.BOOLEAN,
    })
    active: boolean;

    @Column({
        type: DataType.BOOLEAN,
    })
    notificado: boolean;

    @Column({
        type: DataType.BOOLEAN,
        allowNull: false,
    })
    msg_welcome: boolean;

    @Column({
        type: DataType.BOOLEAN,
        allowNull: false,
    })
    msg_welcome_selfservice: boolean;

    @Column({
        type: DataType.BIGINT.UNSIGNED,
    })
    account_type_id: bigint;

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