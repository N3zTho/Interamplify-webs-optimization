"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GestorService = void 0;
const common_1 = require("@nestjs/common");
const gestor_repository_1 = require("../repositories/gestor.repository");
let GestorService = class GestorService {
    constructor(gestorRepository) {
        this.gestorRepository = gestorRepository;
    }
    async findAll(page = 1, limit = 10) {
        const gestores = await this.gestorRepository.findAll(page, limit);
        return gestores;
    }
    async get(id) {
        const gestor = await this.gestorRepository.findById(id);
        return gestor;
    }
    async getByType(type) {
        const gestores = await this.gestorRepository.findGestoresByType(type);
        return gestores;
    }
};
GestorService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [gestor_repository_1.GestorRepository])
], GestorService);
exports.GestorService = GestorService;
//# sourceMappingURL=gestor.service.js.map