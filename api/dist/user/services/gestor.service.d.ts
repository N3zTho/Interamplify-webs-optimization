import { Gestor } from '../models/gestor.model';
import { GestorRepository } from '../repositories/gestor.repository';
export declare class GestorService {
    private gestorRepository;
    constructor(gestorRepository: GestorRepository);
    findAll(page?: number, limit?: number): Promise<Gestor[]>;
    get(id: number): Promise<Gestor>;
    getByType(type: boolean): Promise<Gestor[]>;
}
