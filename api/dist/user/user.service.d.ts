import { User } from './user.entity';
import { UserRepository } from './user.repository';
export declare class UserService {
    private userRepository;
    constructor(userRepository: UserRepository);
    get(id: number): Promise<User>;
    getByUuid(uuid: string): Promise<User>;
}
