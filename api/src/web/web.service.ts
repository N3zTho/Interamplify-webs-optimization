import { Injectable, Inject } from '@nestjs/common';
import { Web } from './web.entity';
import { WebRepository } from './web.repository';
import * as XLSX from 'xlsx';
import * as path from 'path';

@Injectable()
export class WebService {
    constructor(private webRepository: WebRepository) { }

    async findAll(): Promise<Web[]> {
        const webs: Web[] = await this.webRepository.findAll();

        return webs;
    }

    async duplicates(domains: Array<string> ): Promise<string> {
        try {
            const attributes: Array<string> = ['id', 'dominio'];
            let matched: Array<string> = [];

            let page = 1;
            const limit = 250;

            let flag = true;
            while (flag) {
                const webs: Web[] = await this.webRepository.findWithAttributes(attributes, page, limit);
                if (webs.length > 0) {

                    const matchedWeb: Array<string> = domains.filter(d => webs.some(w =>
                        d['Domains'] === w['dominio']
                    ));

                    matched = [...matchedWeb];

                    domains = domains.filter(d => !matched.some(m => d['Domains'] === m));

                } else {
                    flag = false;
                }
                page++;
            }

            let matchedDomains = [["Domains"]];
            let unmatchedDomains = [["Domains"]];
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

            const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}.xlsx`;
            const fileName: string = path.resolve(__dirname, '../../', './public', uniqueSuffix);
            XLSX.writeFile(wb, fileName)

            return fileName;
        } catch (e) {
            console.log(e);
        }

        return "error";
    }
}