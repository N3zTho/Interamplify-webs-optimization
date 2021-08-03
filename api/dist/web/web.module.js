"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebModule = void 0;
const bull_1 = require("@nestjs/bull");
const common_1 = require("@nestjs/common");
const web_service_1 = require("./web.service");
const web_repository_1 = require("./web.repository");
const web_controller_1 = require("./web.controller");
const duplicates_consumer_1 = require("./jobs/duplicates.consumer");
let WebModule = class WebModule {
};
WebModule = __decorate([
    common_1.Module({
        imports: [
            bull_1.BullModule.registerQueue({
                name: 'domainDuplicates',
            }),
        ],
        exports: [web_service_1.WebService],
        controllers: [web_controller_1.WebController],
        providers: [web_service_1.WebService, web_repository_1.WebRepository, duplicates_consumer_1.DuplicatesConsumer],
    })
], WebModule);
exports.WebModule = WebModule;
//# sourceMappingURL=web.module.js.map