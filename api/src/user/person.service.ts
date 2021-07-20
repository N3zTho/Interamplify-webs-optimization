import { Injectable, Inject } from '@nestjs/common';
import { Person } from './person.entity';
import { PersonRepository } from './person.repository';

@Injectable()
export class PersonService {
    constructor(private personRepository: PersonRepository) {
    }

    async get(id: number): Promise<Person> {
        const person: Person = await this.personRepository.findById(id);

        return person;
    }
}