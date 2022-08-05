import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Web } from './web.entity';
import { WebGestor} from "./models/web-gestor.model";
import sequelize, {Op} from "sequelize";
import {Gestor} from "../user/models/gestor.model";

@Injectable()
export class WebRepository {
  // constructor(@InjectModel(Web) private webModel: typeof Web) {}

  async findAll(params: object = {}, page = 1, limit = 10): Promise<Web[]> {
    const webs = await Web.findAll({
      offset: page * limit - limit,
      limit: limit,
    });

    return webs;
  }

  async findById(id: number): Promise<Web> {
    const web = await Web.findByPk(id);

    return web;
  }

  async findWithAttributes(attributes: Array<string>, page = 1, limit = 10 , filter: any = {},
                           order: any =  [['id', 'ASC']]): Promise<Web[]> {

    let query: any = {
      offset: page * limit - limit,
      limit: limit,
      attributes: attributes,
      order: order,
    };

    if(Object.keys(filter).length) {
      query.where = filter;
    }

    const webs = await Web.findAll(query);

    return webs;
  }

  async findWebsForDuplicates(page = 1, limit = 10 , order: any =  [['id', 'ASC']]): Promise<Web[]> {

    let query: any = {
      attributes: ['id', 'dominio', 'id_gestor'],
      include: [
        {
          model: WebGestor, attributes: ['gestor_id'], required:false
        },
      ],
      offset: page * limit - limit,
      limit: limit,
      order: order,
      // raw: true
    };

    const webs = await Web.findAll(query);

    return webs;
  }

  async findWebsForDuplicatesV2(domains: string[]): Promise<Web[]> {

    let query: any = {
      attributes: ['id', 'dominio', 'id_gestor'],
      include: [
        {
          model: WebGestor, attributes: ['gestor_id'], required: true,
          include: [
            {
              model: Gestor, attributes: ['id', 'plataforma'], required: true,
              where: {
                plataforma: {
                  [Op.eq]: false,
                }
              },
            }
          ]
        },
      ],
      where: {
        dominio: sequelize.where(sequelize.fn('LOWER', sequelize.col('dominio')), {
          [Op.in]: domains
        }),
        disponible: {
          [Op.eq] : 1
        }
      },
      order: [['id', 'ASC']]
    };

    const webs = await Web.findAll(query);

    return webs;
  }
}
