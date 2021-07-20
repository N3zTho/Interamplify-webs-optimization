import { Injectable } from '@nestjs/common';
import { Person } from './person.entity';

@Injectable()
export class PersonRepository {

    async findAll(params: object = {}, page = 1, limit = 10): Promise<Person[]> {
        const people = await Person.findAll({
            offset: page * limit - limit,
            limit: limit,
        });

        return people;
    }

    async findById(id: number): Promise<Person> {
        const person = await Person.findByPk(id);

        return person;
    }
}