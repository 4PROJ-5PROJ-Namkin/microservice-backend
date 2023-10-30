import { TypeOrmModuleAsyncOptions, TypeOrmModuleOptions } from "@nestjs/typeorm";
import { ConfigService, ConfigModule } from '@nestjs/config';
import { MaterialPrice } from "src/entities/material-price.entity";
import { Material } from "src/entities/material.entity";
import { PartInformation } from "src/entities/part-information.entity";

export default class TypeOrmConfig {
    static getProductionOrmConfig(configService: ConfigService): TypeOrmModuleOptions {
        return {
            type: 'postgres',
            host: 'localhost',
            port: 5432,
            username: configService.get<string>('POSTGRES_USER'),
            password: configService.get<string>('POSTGRES_PASSWORD'),
            database: configService.get<string>('POSTGRES_DB'),
            entities: [PartInformation, Material, MaterialPrice],
            synchronize: true,
        }
    }
}

export const productionDbConfig: TypeOrmModuleAsyncOptions = {
    imports: [ConfigModule.forRoot({ isGlobal: true })],
    useFactory: async (configService: ConfigService):
        Promise<TypeOrmModuleOptions> => TypeOrmConfig.getProductionOrmConfig(configService),
    inject: [ConfigService]
};