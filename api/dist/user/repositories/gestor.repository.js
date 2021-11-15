"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GestorRepository = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("sequelize");
const gestor_model_1 = require("../models/gestor.model");
let GestorRepository = class GestorRepository {
    async findAll(page = 1, limit = 10) {
        const gestores = await gestor_model_1.Gestor.findAll({
            offset: page * limit - limit,
            limit: limit,
        });
        return gestores;
    }
    async findById(id) {
        const gestor = await gestor_model_1.Gestor.findByPk(id);
        return gestor;
    }
    async findGestoresByType(type) {
        const gestores = await gestor_model_1.Gestor.findAll({
            where: {
                excluir_webs: {
                    [sequelize_1.Op.eq]: type,
                },
            }
        });
        return gestores;
    }
};
GestorRepository = __decorate([
    common_1.Injectable()
], GestorRepository);
exports.GestorRepository = GestorRepository;
//# sourceMappingURL=gestor.repository.js.map