import { Model } from 'sequelize-typescript';
export declare class Person extends Model {
    id: bigint;
    nombre: string;
    apellidos: string;
    email: string;
    empresa: string;
    cif: string;
    skype: string;
    whatsapp: string;
    telefono: string;
    direccion: string;
    ciudad: string;
    codigo_postal: string;
    pais: string;
    idioma: string;
    createdAt: Date;
    updatedAt: Date;
}
