import {Table, Column, Model, DataType, CreatedAt, UpdatedAt, HasMany} from 'sequelize-typescript';
import {WebGestor} from "./models/web-gestor.model";

@Table({
    tableName: "web"
})
export class Web extends Model {
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
    dominio: string;

    @Column({
        type: DataType.BOOLEAN,
        allowNull: false,
    })
    disponible: boolean;

    @Column
    comentarios: string;

    @Column
    pais: string;

    @Column
    idioma: string;

    @Column({
        type: DataType.INTEGER,
    })
    precio: number;

    @Column({
        type: DataType.DECIMAL(8,2),
    })
    precio_venta: number;

    @Column
    tipo_contacto: string;

    @Column({
        type: DataType.STRING(3),
    })
    divisa: string;

    @Column
    id_gestor: number;

    @Column
    gambling: boolean;

    @Column
    imagen: string;

    @Column
    executed_cron_spy: boolean;

    @Column
    executed_secure_cron_spy: boolean;

    @Column
    fecha_upload: Date;

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

    @HasMany(() => WebGestor, { foreignKey: "web_id" })
    webGestores: WebGestor[];
}
