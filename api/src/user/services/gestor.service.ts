import { Injectable, Inject } from '@nestjs/common';
import { Gestor } from '../models/gestor.model';
import { GestorRepository } from '../repositories/gestor.repository';

@Injectable()
export class GestorService {
    constructor(private gestorRepository: GestorRepository) {
    }

    async findAll(page = 1, limit = 10): Promise<Gestor[]> {
        const gestores: Gestor[] = await this.gestorRepository.findAll(page, limit);

        return gestores;
    }

    async get(id: number): Promise<Gestor> {
        const gestor: Gestor = await this.gestorRepository.findById(id);

        return gestor;
    }

    async getByType(type: boolean): Promise<Gestor[]> {
        const gestores: Gestor[] = await this.gestorRepository.findGestoresByType(type);

        return gestores;
    }

}
