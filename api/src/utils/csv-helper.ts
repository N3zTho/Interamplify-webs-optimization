import { Injectable } from '@nestjs/common';
import * as csv from 'csv-parser';
import * as fs from 'fs';
import * as path from 'path';

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
}