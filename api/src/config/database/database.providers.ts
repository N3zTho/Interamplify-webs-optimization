import { Sequelize } from 'sequelize-typescript';
import { databaseConfig } from './database.config';
import { Web } from '../../web/web.entity';
import { WebGestor} from "../../web/models/web-gestor.model";
import { User } from '../../user/user.entity';
import { Person } from '../../user/person.entity';
import { Gestor } from '../../user/models/gestor.model';
import { InternalReport } from '../../report/models/internal-report.model';

const SEQUELIZE = 'SEQUELIZE';
const DEVELOPMENT = 'development';
const TEST = 'test';
const PRODUCTION = 'production';

export const databaseProviders = [
  {
    provide: SEQUELIZE,
    useFactory: async () => {
      let config;
      switch (process.env.NODE_ENV) {
        case DEVELOPMENT:
          config = databaseConfig.development;
          break;
        case TEST:
          config = databaseConfig.test;
          break;
        case PRODUCTION:
          config = databaseConfig.production;
          break;
        default:
          config = databaseConfig.development;
      }
      const sequelize = new Sequelize(config);
      sequelize.addModels([Web, WebGestor, User, Person, Gestor, InternalReport]);

      return sequelize;
    },
  },
];
