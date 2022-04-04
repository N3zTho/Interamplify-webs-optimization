import { Injectable, Inject } from '@nestjs/common';
import { Op } from 'sequelize';
import * as XLSX from 'xlsx';
import * as path from 'path';
import { Web } from './web.entity';
import { WebRepository } from './web.repository';
import { GestorService } from "../user/services/gestor.service";

@Injectable()
export class WebService {
    constructor(private webRepository: WebRepository, private gestorService: GestorService) { }

    async findAll(): Promise<Web[]> {
        const webs: Web[] = await this.webRepository.findAll();

        return webs;
    }

    async duplicates(domains: Array<string> ): Promise<string> {
        try {

            const gestoresId = [];
            const gestores = await this.gestorService.getByType(false);
            gestores.map(gestor => {
                gestoresId.push(gestor.get('id'));
            });
            const order: Array<string>[] = [['dominio', 'ASC']];
            let matched: Array<string> = [];

            let page = 1;
            const limit = 1000;

            let flag = true;

            domains.sort();

            while (flag) {
                const webs: Web[] = await this.webRepository.findWebsForDuplicates(page, limit, order);
                if (webs.length > 0) {

                    const matchedWeb: Array<string> = domains.filter(d => webs.some(
                        w =>
                            d['Domains'] && w['dominio'] && d['Domains'].trim().toLowerCase() === w['dominio'].toLowerCase() &&
                                ( gestoresId.includes(w['id_gestor']) ||
                                    w['webGestores'].some(wg => gestoresId.includes(wg.gestor_id)))

                    ));

                    if(matchedWeb.length > 0) {
                        matched.push(...matchedWeb);
                    }

                    domains = domains.filter(d => !matched.some(m => d['Domains'] === m['Domains']));

                } else {
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
            const fileName: string = path.resolve(__dirname, '../../', './public', uniqueSuffix);
            XLSX.writeFile(wb, fileName);

            return fileName;

        } catch (e) {
            console.log(e);
        }

        return "error";
    }

    async duplicatesV2(domains: Array<string> ): Promise<string> {
        try {

            const gestoresId = [];
            const gestores = await this.gestorService.getByType(false);
            gestores.map(gestor => {
                gestoresId.push(gestor.get('id'));
            });
            const matched: Array<string> = [];

            domains.sort();

            const chunkSize = 20;
            const groups = domains.map((e, i) => {
                return i % chunkSize === 0 ? domains.slice(i, i + chunkSize) : null;
            }).filter(e => { return e; });

            for await (const it of groups) {
                console.log(`Processing ${it.length} domains`);

                const domainList = it.map(d => d['Domains']);

                const webs: Web[] = await this.webRepository.findWebsForDuplicatesV2(domainList);

                if (webs.length > 0) {
                    const matchedWeb: Array<string> = domainList.filter(d => webs.some(
                        w =>
                            d === w['dominio'] && (gestoresId.includes(w['id_gestor']) ||
                            w['webGestores'].some(wg => gestoresId.includes(wg.gestor_id)))
                    ));

                    if (matchedWeb.length > 0) {
                        matched.push(...matchedWeb);
                    }
                }
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
            const fileName: string = path.resolve(__dirname, '../../', './public', uniqueSuffix);
            XLSX.writeFile(wb, fileName);

            return fileName;

        } catch (e) {
            console.log(e);
        }

        return "error";
    }
}
