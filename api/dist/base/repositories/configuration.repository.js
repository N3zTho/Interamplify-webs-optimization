"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfigurationRepository = void 0;
const common_1 = require("@nestjs/common");
const configuration_model_1 = require("../models/configuration.model");
let ConfigurationRepository = class ConfigurationRepository {
    async findByKey(userId, key) {
        const configuration = await configuration_model_1.Configuration.findOne({
            where: {
                key: key,
                user_id: userId,
            }
        });
        return configuration;
    }
};
ConfigurationRepository = __decorate([
    common_1.Injectable()
], ConfigurationRepository);
exports.ConfigurationRepository = ConfigurationRepository;
//# sourceMappingURL=configuration.repository.js.map