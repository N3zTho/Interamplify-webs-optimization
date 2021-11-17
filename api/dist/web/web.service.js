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
exports.WebService = void 0;
const common_1 = require("@nestjs/common");
const XLSX = require("xlsx");
const path = require("path");
const web_repository_1 = require("./web.repository");
const gestor_service_1 = require("../user/services/gestor.service");
let WebService = class WebService {
    constructor(webRepository, gestorService) {
        this.webRepository = webRepository;
        this.gestorService = gestorService;
    }
    async findAll() {
        const webs = await this.webRepository.findAll();
        return webs;
    }
    async duplicates(domains) {
        try {
            const gestoresId = [];
            const gestores = await this.gestorService.getByType(true);
            gestores.map(gestor => {
                gestoresId.push(gestor.get('id'));
            });
            const attributes = ['id', 'dominio', 'id_gestor'];
            const order = [['dominio', 'ASC']];
            let matched = [];
            let page = 1;
            const limit = 500;
            let flag = true;
            domains.sort();
            while (flag) {
                const webs = await this.webRepository.findWithAttributes(attributes, page, limit, {}, order);
                if (webs.length > 0) {
                    const matchedWeb = domains.filter(d => webs.some(w => d['Domains'].toLowerCase() === w['dominio'].toLowerCase() &&
                        !gestoresId.includes(w['id_gestor'])));
                    if (matchedWeb.length > 0) {
                        matched.push(...matchedWeb);
                    }
                    domains = domains.filter(d => !matched.some(m => d['Domains'] === m['Domains']));
                }
                else {
                    flag = false;
                }
                page++;
            }
            const matchedDomains = [["Domains"]];
            const unmatchedDomains = [["Domains"]];
            matched.map(m => {
                matchedDomains.push([m['Domains']]);
            });
            domains.map(um => {
                unmatchedDomains.push([um['Domains']]);
            });
            const wb = XLSX.utils.book_new();
            const matchedWS = XLSX.utils.aoa_to_sheet(matchedDomains);
            XLSX.utils.book_append_sheet(wb, matchedWS, 'Matched Domains');
            const unmatchedWS = XLSX.utils.aoa_to_sheet(unmatchedDomains);
            XLSX.utils.book_append_sheet(wb, unmatchedWS, 'Unmatched Domains');
            const uniqueSuffix = `duplicates-${Date.now()}-${Math.round(Math.random() * 1e9)}.xlsx`;
            const fileName = path.resolve(__dirname, '../../', './public', uniqueSuffix);
            XLSX.writeFile(wb, fileName);
            return fileName;
        }
        catch (e) {
            console.log(e);
        }
        return "error";
    }
};
WebService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [web_repository_1.WebRepository, gestor_service_1.GestorService])
], WebService);
exports.WebService = WebService;
//# sourceMappingURL=web.service.js.map