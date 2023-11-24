import { TypeOrmModuleAsyncOptions, TypeOrmModuleOptions } from "@nestjs/typeorm";
import { ConfigService, ConfigModule } from '@nestjs/config';
import Users from "src/users/entities/users.entity";


export default class TypeOrmConfig {
    static getUserOrmConfig(configService: ConfigService): TypeOrmModuleOptions {
        return {
            type: 'postgres',
            host: configService.get<string>('POSTGRES_HOST'),
            port: configService.get<number>('POSTGRES_PORT'),
            username: configService.get<string>('POSTGRES_USER'),
            password: configService.get<string>('POSTGRES_PASSWORD'),
            database: configService.get<string>('POSTGRES_DB'),
            entities: [Users],
            synchronize: true,
        }
    }
}

export const userDbConfig: TypeOrmModuleAsyncOptions = {
    imports: [ConfigModule.forRoot({ isGlobal: true })],
    useFactory: async (configService: ConfigService):
        Promise<TypeOrmModuleOptions> => TypeOrmConfig.getUserOrmConfig(configService),
    inject: [ConfigService]
};