import { Injectable } from '@nestjs/common';
import { User } from './user.entity';

@Injectable()
export class UserRepository {

    async findAll(params: object = {}, page = 1, limit = 10): Promise<User[]> {
        const users = await User.findAll({
            offset: page * limit - limit,
            limit: limit,
        });

        return users;
    }

    async findById(id: number): Promise<User> {
        const user = await User.findByPk(id);

        return user;
    }
}
