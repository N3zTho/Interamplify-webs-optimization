import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Web } from './web.entity';

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

  async findWithAttributes(attributes: Array<string>, page = 1, limit = 10,): Promise<Web[]> {
    const webs = await Web.findAll({
      offset: page * limit - limit,
      limit: limit,
      attributes: attributes,
      order: [['id', 'ASC']],
    });

    return webs;
  }
}
