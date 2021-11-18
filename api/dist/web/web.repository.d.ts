import { Web } from './web.entity';
export declare class WebRepository {
    findAll(params?: object, page?: number, limit?: number): Promise<Web[]>;
    findById(id: number): Promise<Web>;
    findWithAttributes(attributes: Array<string>, page?: number, limit?: number, filter?: any, order?: any): Promise<Web[]>;
    findWebsForDuplicates(page?: number, limit?: number, order?: any): Promise<Web[]>;
}
