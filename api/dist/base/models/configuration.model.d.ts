import { Model } from 'sequelize-typescript';
export declare class Configuration extends Model {
    id: bigint;
    key: string;
    value: string;
    user_id: bigint;
    createdAt: Date;
    updatedAt: Date;
}
