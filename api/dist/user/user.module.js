"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModule = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("./user.service");
const person_service_1 = require("./person.service");
const gestor_service_1 = require("./services/gestor.service");
const user_repository_1 = require("./user.repository");
const person_repository_1 = require("./person.repository");
const gestor_repository_1 = require("./repositories/gestor.repository");
let UserModule = class UserModule {
};
UserModule = __decorate([
    common_1.Global(),
    common_1.Module({
        imports: [],
        exports: [user_service_1.UserService, person_service_1.PersonService, gestor_service_1.GestorService],
        controllers: [],
        providers: [user_service_1.UserService, person_service_1.PersonService, gestor_service_1.GestorService, user_repository_1.UserRepository, person_repository_1.PersonRepository, gestor_repository_1.GestorRepository],
    })
], UserModule);
exports.UserModule = UserModule;
//# sourceMappingURL=user.module.js.map