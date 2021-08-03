"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UtilsModule = void 0;
const common_1 = require("@nestjs/common");
const csv_helper_1 = require("./csv-helper");
const cloud_storage_service_1 = require("./cloud-storage.service");
const template_service_1 = require("./template.service");
const email_service_1 = require("./email.service");
let UtilsModule = class UtilsModule {
};
UtilsModule = __decorate([
    common_1.Global(),
    common_1.Module({
        imports: [],
        exports: [csv_helper_1.CsvHelperService, cloud_storage_service_1.CloudStorageService, template_service_1.TemplateService, email_service_1.EmailService],
        controllers: [],
        providers: [csv_helper_1.CsvHelperService, cloud_storage_service_1.CloudStorageService, template_service_1.TemplateService, email_service_1.EmailService],
    })
], UtilsModule);
exports.UtilsModule = UtilsModule;
//# sourceMappingURL=utils.module.js.map