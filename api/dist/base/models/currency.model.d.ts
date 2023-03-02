import { Model } from 'sequelize-typescript';
export declare class Currency extends Model {
    id: bigint;
    name: string;
    code: string;
    symbol: string;
    usd: number;
    usd_before: number;
    eur: number;
    eur_before: number;
    gbp: number;
    gbp_before: number;
    mxn: number;
    mxn_before: number;
    createdAt: Date;
    updatedAt: Date;
}
