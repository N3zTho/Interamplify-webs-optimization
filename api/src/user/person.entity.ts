import {Table, Column, Model, DataType, CreatedAt, UpdatedAt} from 'sequelize-typescript';

@Table({
    tableName: "persona"
})
export class Person extends Model {
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
    nombre: string;

    @Column({
        type: DataType.STRING(255),
    })
    apellidos: string;

    @Column({
        type: DataType.STRING(120),
    })
    email: string;

    @Column({
        type: DataType.STRING(255),
    })
    empresa: string;

    @Column({
        type: DataType.STRING(255),
    })
    cif: string;

    @Column({
        type: DataType.STRING(255),
    })
    skype: string;

    @Column({
        type: DataType.STRING(255),
    })
    whatsapp: string;

    @Column({
        type: DataType.STRING(255),
    })
    telefono: string;

    @Column({
        type: DataType.STRING(255),
    })
    direccion: string;

    @Column({
        type: DataType.STRING(255),
    })
    ciudad: string;


    @Column({
        type: DataType.STRING(255),
    })
    codigo_postal: string;

    @Column({
        type: DataType.STRING(2),
    })
    pais: string;

    @Column({
        type: DataType.STRING(2),
    })
    idioma: string;

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