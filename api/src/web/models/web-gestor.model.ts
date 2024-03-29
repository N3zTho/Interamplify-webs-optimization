import {Table, Column, Model, DataType, CreatedAt, UpdatedAt, ForeignKey, BelongsTo} from 'sequelize-typescript';
import {Web} from "../web.entity";
import {Gestor} from "../../user/models/gestor.model";
import {Currency} from "../../base/models/currency.model";

@Table({
    tableName: "web_gestor"
})
export class WebGestor extends Model {
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
    @ForeignKey(() => Web)
    web_id: number;

    @Column({
        type: DataType.BIGINT.UNSIGNED,
        allowNull: false,
    })
    gestor_id: number;

    @Column({
        type: DataType.DECIMAL(8,2),
    })
    precio: number;

    @Column({
        type: DataType.STRING(3),
    })
    divisa: string;

    @Column
    gambling: boolean;

    @Column
    available: boolean;

    @Column
    comentarios: string;

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

    @BelongsTo(() => Web, { foreignKey: "web_id" })
    web: Web;

    @BelongsTo(() => Gestor, { foreignKey: "gestor_id" })
    gestor: Gestor;

    @BelongsTo(() => Currency, { foreignKey: 'divisa', targetKey:'code'})
    currency: Currency;
}
