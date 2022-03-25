import { Model } from 'sequelize-typescript';
import { Web } from "../web.entity";
export declare class WebGestor extends Model {
    id: bigint;
    web_id: number;
    gestor_id: number;
    precio: number;
    divisa: string;
    gambling: boolean;
    comentarios: string;
    createdAt: Date;
    updatedAt: Date;
    web: Web;
}
