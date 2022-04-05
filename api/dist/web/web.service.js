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
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
var WebService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebService = void 0;
const common_1 = require("@nestjs/common");
const XLSX = require("xlsx");
const path = require("path");
const web_repository_1 = require("./web.repository");
const gestor_service_1 = require("../user/services/gestor.service");
let WebService = WebService_1 = class WebService {
    constructor(webRepository, gestorService) {
        this.webRepository = webRepository;
        this.gestorService = gestorService;
        this.logger = new common_1.Logger(WebService_1.name);
    }
    async findAll() {
        const webs = await this.webRepository.findAll();
        return webs;
    }
    async duplicates(domains) {
        try {
            const gestoresId = [];
            const gestores = await this.gestorService.getByType(false);
            gestores.map(gestor => {
                gestoresId.push(gestor.get('id'));
            });
            const order = [['dominio', 'ASC']];
            let matched = [];
            let page = 1;
            const limit = 1000;
            let flag = true;
            domains.sort();
            while (flag) {
                const webs = await this.webRepository.findWebsForDuplicates(page, limit, order);
                if (webs.length > 0) {
                    const matchedWeb = domains.filter(d => webs.some(w => d['Domains'] && w['dominio'] && d['Domains'].trim().toLowerCase() === w['dominio'].toLowerCase() &&
                        (gestoresId.includes(w['id_gestor']) ||
                            w['webGestores'].some(wg => gestoresId.includes(wg.gestor_id)))));
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
    async duplicatesV2(domains) {
        var e_1, _a;
        try {
            const matched = [];
            domains.sort();
            const chunkSize = 20;
            const groups = domains.map((e, i) => {
                return i % chunkSize === 0 ? domains.slice(i, i + chunkSize) : null;
            }).filter(e => { return e; });
            try {
                for (var groups_1 = __asyncValues(groups), groups_1_1; groups_1_1 = await groups_1.next(), !groups_1_1.done;) {
                    const it = groups_1_1.value;
                    this.logger.debug(`Processing ${it.length} domains`);
                    const domainList = it.map(d => d['Domains']);
                    const webs = await this.webRepository.findWebsForDuplicatesV2(domainList);
                    if (webs.length > 0) {
                        const matchedWeb = webs.map(w => w['dominio']);
                        if (matchedWeb.length > 0) {
                            matched.push(...matchedWeb);
                        }
                    }
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (groups_1_1 && !groups_1_1.done && (_a = groups_1.return)) await _a.call(groups_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
            const matchedDomains = [["Domains"]];
            const unmatchedDomains = [["Domains"]];
            matched.map(m => {
                matchedDomains.push([m]);
            });
            const unmatched = domains.filter(d => !matched.some(m => d['Domains'] === m));
            unmatched.map(um => {
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
WebService = WebService_1 = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [web_repository_1.WebRepository, gestor_service_1.GestorService])
], WebService);
exports.WebService = WebService;
//# sourceMappingURL=web.service.js.map