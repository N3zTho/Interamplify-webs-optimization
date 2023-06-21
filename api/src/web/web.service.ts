import {Injectable, Inject, Logger} from '@nestjs/common';
import { Op } from 'sequelize';
import * as XLSX from 'xlsx';
import * as path from 'path';
import { Web } from './web.entity';
import { WebRepository } from './web.repository';
import { GestorService } from "../user/services/gestor.service";

@Injectable()
export class WebService {
    constructor(private webRepository: WebRepository, private gestorService: GestorService) { }

    private readonly logger = new Logger(WebService.name);

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

            const matched: Array<any> = [];

            domains.sort();

            const chunkSize = 40;
            const groups = domains.map((e, i) => {
                return i % chunkSize === 0 ? domains.slice(i, i + chunkSize) : null;
            }).filter(e => { return e; });

            for await (const it of groups) {
                this.logger.debug(`Processing ${it.length} domains`);

                const domainList = it.map(d => d['Domains'].trim().toLowerCase());

                const webs: Web[] = await this.webRepository.findWebsForDuplicatesV2(domainList);
                webs.map(w => this.logger.debug(w));

                if (webs.length > 0) {
                    const matchedWeb = webs.map(w => {
                        let gambling = w['gambling'] == true ? true : false;

                        if (w['webGestores'] && w['webGestores'].length > 0) {
                            const manager = this.getMinManager(w['webGestores']);
                            if (manager) {
                                gambling = manager.gambling == true ? true : false;
                            }
                        }

                        const it = {
                            'domain': w['dominio'].toLowerCase(),
                            'gambling': gambling,
                            'contact': w['tipo_contacto']
                        };

                        return it;
                    });

                    if (matchedWeb.length > 0) {
                        matched.push(...matchedWeb);
                    }
                }
            }

            const matchedDomains: Array<{}> = [];
            const unmatchedDomains = [["Domains"]];
            matched.map(m => {
                matchedDomains.push(
                    {
                        Domains: m.domain,
                        Gambling: m.gambling  === true ? 'YES' : 'NO',
                        Contact: m.contact
                    }
                );
            });

            const unmatched = domains.filter(d => !matched.some(m => d['Domains'].trim().toLowerCase() === m.domain));

            unmatched.map(um => {
                unmatchedDomains.push([um['Domains']]);
            });

            const wb = XLSX.utils.book_new();
            const matchedWS = XLSX.utils.json_to_sheet(matchedDomains);
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

    /**
     *
     * Get the manager with the minor price
     *
     * @param manager
     */
    getMinManager(managers: Array<any>): any {
        let minPrice = 0;
        let manager = null;

        managers.map(m => {
            let price = m.precio;
            if (m.currency) {
                if (m.currency.usd > 0) {
                    price = price * m.currency.usd;
                }
            }

            if (manager === null ||
                (price < minPrice && (m.gambling == true || manager.gambling == false)) ||
                (m.gambling == true && manager.gambling == false)
            ) {
                minPrice = price;
                manager = m;
            }
        });

        return manager;
    }
}
