"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebRepository = void 0;
const common_1 = require("@nestjs/common");
const web_entity_1 = require("./web.entity");
const web_gestor_model_1 = require("./models/web-gestor.model");
const sequelize_1 = require("sequelize");
const gestor_model_1 = require("../user/models/gestor.model");
const currency_model_1 = require("../base/models/currency.model");
let WebRepository = class WebRepository {
    async findAll(params = {}, page = 1, limit = 10) {
        const webs = await web_entity_1.Web.findAll({
            offset: page * limit - limit,
            limit: limit,
        });
        return webs;
    }
    async findById(id) {
        const web = await web_entity_1.Web.findByPk(id);
        return web;
    }
    async findWithAttributes(attributes, page = 1, limit = 10, filter = {}, order = [['id', 'ASC']]) {
        let query = {
            offset: page * limit - limit,
            limit: limit,
            attributes: attributes,
            order: order,
        };
        if (Object.keys(filter).length) {
            query.where = filter;
        }
        const webs = await web_entity_1.Web.findAll(query);
        return webs;
    }
    async findWebsForDuplicates(page = 1, limit = 10, order = [['id', 'ASC']]) {
        let query = {
            attributes: ['id', 'dominio', 'id_gestor'],
            include: [
                {
                    model: web_gestor_model_1.WebGestor, attributes: ['gestor_id'], required: false
                },
            ],
            offset: page * limit - limit,
            limit: limit,
            order: order,
        };
        const webs = await web_entity_1.Web.findAll(query);
        return webs;
    }
    async findWebsForDuplicatesV2(domains) {
        let query = {
            attributes: ['id', 'dominio', 'gambling', 'tipo_contacto', 'id_gestor'],
            include: [
                {
                    model: web_gestor_model_1.WebGestor, attributes: ['gestor_id', 'available', 'gambling', 'precio'], required: true,
                    include: [
                        {
                            model: gestor_model_1.Gestor, attributes: ['plataforma'], required: true,
                            where: {
                                plataforma: {
                                    [sequelize_1.Op.eq]: false,
                                }
                            },
                        },
                        {
                            model: currency_model_1.Currency, attributes: ['usd'], required: true,
                        }
                    ],
                    where: {
                        available: {
                            [sequelize_1.Op.eq]: 1
                        }
                    }
                },
            ],
            where: {
                dominio: sequelize_1.default.where(sequelize_1.default.fn('LOWER', sequelize_1.default.col('dominio')), {
                    [sequelize_1.Op.in]: domains
                }),
            },
            order: [['id', 'ASC']]
        };
        const webs = await web_entity_1.Web.findAll(query);
        return webs;
    }
};
WebRepository = __decorate([
    common_1.Injectable()
], WebRepository);
exports.WebRepository = WebRepository;
//# sourceMappingURL=web.repository.js.map