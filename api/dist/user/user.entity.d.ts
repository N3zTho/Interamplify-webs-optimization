import { Model } from 'sequelize-typescript';
export declare class User extends Model {
    id: bigint;
    avatar: string;
    uuid: string;
    login: string;
    password: string;
    roles: string;
    email: string;
    active: boolean;
    notificado: boolean;
    msg_welcome: boolean;
    msg_welcome_selfservice: boolean;
    account_type_id: bigint;
    createdAt: Date;
    updatedAt: Date;
}
