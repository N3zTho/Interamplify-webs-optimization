"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const bull_1 = require("@nestjs/bull");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const platform_express_1 = require("@nestjs/platform-express");
const database_module_1 = require("./config/database/database.module");
const web_module_1 = require("./web/web.module");
const user_module_1 = require("./user/user.module");
const utils_module_1 = require("./utils/utils.module");
let AppModule = class AppModule {
};
AppModule = __decorate([
    common_1.Module({
        imports: [
            config_1.ConfigModule.forRoot({ isGlobal: true }),
            platform_express_1.MulterModule.register({
                dest: './public/files',
            }),
            bull_1.BullModule.forRoot({
                redis: {
                    host: process.env.REDIS_URL,
                    port: parseInt(process.env.REDIS_PORT, 10) || 6379,
                    username: process.env.REDIS_USER,
                    password: process.env.REDIS_PASSWORD,
                },
            }),
            database_module_1.DatabaseModule,
            utils_module_1.UtilsModule,
            user_module_1.UserModule,
            web_module_1.WebModule,
        ],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map