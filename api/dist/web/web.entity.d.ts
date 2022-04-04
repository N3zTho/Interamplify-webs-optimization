import { Model } from 'sequelize-typescript';
import { WebGestor } from "./models/web-gestor.model";
export declare class Web extends Model {
    id: bigint;
    dominio: string;
    disponible: boolean;
    comentarios: string;
    pais: string;
    idioma: string;
    precio: number;
    precio_venta: number;
    tipo_contacto: string;
    divisa: string;
    id_gestor: number;
    gambling: boolean;
    imagen: string;
    executed_cron_spy: boolean;
    executed_secure_cron_spy: boolean;
    fecha_upload: Date;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
    webGestores: WebGestor[];
}
