import { Gestor } from '../models/gestor.model';
export declare class GestorRepository {
    findAll(page?: number, limit?: number): Promise<Gestor[]>;
    findById(id: number): Promise<Gestor>;
    findGestoresByType(type: boolean): Promise<Gestor[]>;
}
