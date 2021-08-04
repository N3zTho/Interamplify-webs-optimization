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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var WebController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebController = void 0;
const bull_1 = require("@nestjs/bull");
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const file_upload_1 = require("./../utils/file-upload");
const web_service_1 = require("./web.service");
let WebController = WebController_1 = class WebController {
    constructor(webService, domainDuplicatesQueue) {
        this.webService = webService;
        this.domainDuplicatesQueue = domainDuplicatesQueue;
        this.logger = new common_1.Logger(WebController_1.name);
    }
    async findAll() {
        const webs = await this.webService.findAll();
        return webs;
    }
    async duplicates(file, request) {
        try {
            const { userId, personId, } = request.body;
            this.logger.log('Adding new task for getting duplicates');
            await this.domainDuplicatesQueue.add({
                fileName: file.filename,
                userId: userId,
                personId: personId
            });
            return 'success';
        }
        catch (e) {
            this.logger.log(e);
            return 'error';
        }
    }
};
__decorate([
    common_1.Get(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], WebController.prototype, "findAll", null);
__decorate([
    common_1.Post('/duplicates'),
    common_1.UseInterceptors(platform_express_1.FileInterceptor('file', {
        storage: multer_1.diskStorage({
            destination: './public',
            filename: file_upload_1.editFileName,
        }),
    })),
    __param(0, common_1.UploadedFile()),
    __param(1, common_1.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], WebController.prototype, "duplicates", null);
WebController = WebController_1 = __decorate([
    common_1.Controller('webs'),
    __param(1, bull_1.InjectQueue('domainDuplicates')),
    __metadata("design:paramtypes", [web_service_1.WebService, Object])
], WebController);
exports.WebController = WebController;
//# sourceMappingURL=web.controller.js.map