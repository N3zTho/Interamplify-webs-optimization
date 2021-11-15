import { Injectable } from '@nestjs/common';
import { Op } from 'sequelize';
import { Gestor } from '../models/gestor.model';

@Injectable()
export class GestorRepository {

    async findAll(page = 1, limit = 10): Promise<Gestor[]> {
        const gestores = await Gestor.findAll({
            offset: page * limit - limit,
            limit: limit,
        });

        return gestores;
    }

    async findById(id: number): Promise<Gestor> {
        const gestor = await Gestor.findByPk(id);

        return gestor;
    }

    async findGestoresByType(type: boolean): Promise<Gestor[]> {
        const gestores = await Gestor.findAll({
           where: {
               excluir_webs: {
                   [Op.eq]: type,
               },
           }
        });

        return gestores;
    }
}
