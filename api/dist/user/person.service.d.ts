import { Person } from './person.entity';
import { PersonRepository } from './person.repository';
export declare class PersonService {
    private personRepository;
    constructor(personRepository: PersonRepository);
    get(id: number): Promise<Person>;
}
