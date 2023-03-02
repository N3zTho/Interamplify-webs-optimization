import { User } from './user.entity';
export declare class UserRepository {
    findAll(params?: object, page?: number, limit?: number): Promise<User[]>;
    findById(id: number): Promise<User>;
    findByUuid(uuid: string): Promise<User>;
}
