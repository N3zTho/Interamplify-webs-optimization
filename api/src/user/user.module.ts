import { Global, Module } from '@nestjs/common';
import { UserService } from './user.service';
import { PersonService } from './person.service';
import { GestorService } from './services/gestor.service';
import { UserRepository } from './user.repository';
import { PersonRepository } from './person.repository';
import { GestorRepository } from './repositories/gestor.repository';

@Global()
@Module({
    imports: [],
    exports: [UserService, PersonService, GestorService],
    controllers: [],
    providers: [UserService, PersonService, GestorService, UserRepository, PersonRepository, GestorRepository],
})
export class UserModule {}
