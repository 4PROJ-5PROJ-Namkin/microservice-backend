"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userDbConfig = void 0;
const config_1 = require("@nestjs/config");
const users_entity_1 = require("../users/entities/users.entity");
class TypeOrmConfig {
    static getUserOrmConfig(configService) {
        return {
            type: 'postgres',
            host: configService.get('POSTGRES_HOST'),
            port: configService.get('POSTGRES_PORT'),
            username: configService.get('POSTGRES_USER'),
            password: configService.get('POSTGRES_PASSWORD'),
            database: configService.get('POSTGRES_DB'),
            entities: [users_entity_1.default],
            synchronize: true,
        };
    }
}
exports.default = TypeOrmConfig;
exports.userDbConfig = {
    imports: [config_1.ConfigModule.forRoot({ isGlobal: true })],
    useFactory: async (configService) => TypeOrmConfig.getUserOrmConfig(configService),
    inject: [config_1.ConfigService]
};
//# sourceMappingURL=user.database.js.map