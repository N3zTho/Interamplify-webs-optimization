import { InternalReport } from "../models/internal-report.model";
export declare class InternalReportService {
    constructor();
    create(user: number, type: string, body: string): Promise<InternalReport>;
}
