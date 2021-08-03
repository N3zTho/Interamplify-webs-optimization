"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.databaseProviders = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const database_config_1 = require("./database.config");
const web_entity_1 = require("../../web/web.entity");
const user_entity_1 = require("../../user/user.entity");
const person_entity_1 = require("../../user/person.entity");
const SEQUELIZE = 'SEQUELIZE';
const DEVELOPMENT = 'development';
const TEST = 'test';
const PRODUCTION = 'production';
exports.databaseProviders = [
    {
        provide: SEQUELIZE,
        useFactory: async () => {
            let config;
            switch (process.env.NODE_ENV) {
                case DEVELOPMENT:
                    config = database_config_1.databaseConfig.development;
                    break;
                case TEST:
                    config = database_config_1.databaseConfig.test;
                    break;
                case PRODUCTION:
                    config = database_config_1.databaseConfig.production;
                    break;
                default:
                    config = database_config_1.databaseConfig.development;
            }
            const sequelize = new sequelize_typescript_1.Sequelize(config);
            sequelize.addModels([web_entity_1.Web, user_entity_1.User, person_entity_1.Person]);
            return sequelize;
        },
    },
];
//# sourceMappingURL=database.providers.js.map