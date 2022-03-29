import { Injectable } from '@nestjs/common';
import * as csv from 'csv-parser';
import * as fs from 'fs';
import * as path from 'path';
import {readFileSync} from 'fs';
import { parse } from 'papaparse';

@Injectable()
export class CsvHelperService {

    async parse(file: string, options: any = {}) {
        const result = [];

        try {

            const stream = fs.createReadStream(path.resolve(__dirname, '../../', './public', file));

            const parser = stream
                .pipe(csv({
                    ...options,
                }));

            for await (const record of parser) {
                result.push(record);
            }

        } catch (e) {
            console.log(e);
        }

        return result;
    }

    async parsev2(file: string, options: any = {}) {
        try {

            const stream = readFileSync(path.resolve(__dirname, '../../', './public', file));
            const data = stream.toString("utf8");
            const resultData = await parse(data, {
                quotes: false,
                escapeChar: '"',
                delimiter: ",",
                header: true,
                skipEmptyLines: true
            });

            if (resultData.data) {
                return resultData.data;
            }

        } catch (e) {
            console.log(e);
        }

        return [];
    }
}
