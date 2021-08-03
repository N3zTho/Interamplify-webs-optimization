import { Person } from './person.entity';
export declare class PersonRepository {
    findAll(params?: object, page?: number, limit?: number): Promise<Person[]>;
    findById(id: number): Promise<Person>;
}
