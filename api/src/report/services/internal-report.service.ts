import { Injectable, Inject } from '@nestjs/common';
import {InternalReport} from "../models/internal-report.model";

@Injectable()
export class InternalReportService {
    constructor() { }

    async create(user: number, type: string, body: string): Promise<InternalReport> {
        const report = await InternalReport.create({
            user_id: user,
            body   : body,
            type   : type
        });

        return  report;
    }
}
