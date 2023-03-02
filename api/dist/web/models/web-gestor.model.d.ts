import { Model } from 'sequelize-typescript';
import { Web } from "../web.entity";
import { Gestor } from "../../user/models/gestor.model";
import { Currency } from "../../base/models/currency.model";
export declare class WebGestor extends Model {
    id: bigint;
    web_id: number;
    gestor_id: number;
    precio: number;
    divisa: string;
    gambling: boolean;
    available: boolean;
    comentarios: string;
    createdAt: Date;
    updatedAt: Date;
    web: Web;
    gestor: Gestor;
    currency: Currency;
}
