import { Model } from 'sequelize-typescript';
export declare class Gestor extends Model {
    id: bigint;
    id_persona: bigint;
    id_usuario: bigint;
    is_agency: boolean;
    plataforma: boolean;
    createdAt: Date;
    updatedAt: Date;
}
