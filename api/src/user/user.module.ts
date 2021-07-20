import { Global, Module } from '@nestjs/common';
import { UserService } from './user.service';
import { PersonService } from './person.service';
import { UserRepository } from './user.repository';
import { PersonRepository } from './person.repository';

@Global()
@Module({
    imports: [],
    exports: [UserService, PersonService],
    controllers: [],
    providers: [UserService, PersonService, UserRepository, PersonRepository],
})
export class UserModule {}
