import {Injectable} from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import * as hbs from 'hbs';

@Injectable()
export class TemplateService {

    getTemplate(templateName:string, params:Object = {}) {
        let page = null;

        try {
            const templatePath = path.resolve(__dirname, '../../', './views/emails', `${templateName}.hbs`);

            const template: string = fs.readFileSync(
                templatePath,
                "utf8"
            );

            const compileTemplate = hbs.compile(template);

            page = compileTemplate(params);

        } catch (e) {
            console.log(e)
        }

        return page;

    }
}