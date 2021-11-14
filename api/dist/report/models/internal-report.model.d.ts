import { Model } from 'sequelize-typescript';
export declare class InternalReport extends Model {
    id: bigint;
    user_id: number;
    body: string;
    type: string;
    createdAt: Date;
    updatedAt: Date;
}
