import { Injectable, Inject } from '@nestjs/common';
import { User } from './user.entity';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
    constructor(private userRepository: UserRepository) {
    }

    async get(id: number): Promise<User> {
        const user: User = await this.userRepository.findById(id);

        return user;
    }

    async getByUuid(uuid: string): Promise<User> {
        const user: User = await this.userRepository.findByUuid(uuid);

        return user;
    }

}
