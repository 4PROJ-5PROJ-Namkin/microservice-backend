import { TypeOrmModuleAsyncOptions, TypeOrmModuleOptions } from "@nestjs/typeorm";
import { ConfigService, ConfigModule } from '@nestjs/config';
import { MaterialPrice } from "src/material-service/entities/material-price.entity";
import { Material } from "src/material-service/entities/material.entity";
import { PartInformation } from "src/part-information-service/entities/part-information.entity";
import { SupplyChain } from "supply-chain-service/entities/supply-chain.entity";
import { Machine } from "supply-chain-service/entities/machine.entity";

export default class TypeOrmConfig {
    static getProductionOrmConfig(configService: ConfigService): TypeOrmModuleOptions {
        return {
            type: 'postgres',
            host: 'localhost',
            port: 5432,
            username: configService.get<string>('POSTGRES_USER'),
            password: configService.get<string>('POSTGRES_PASSWORD'),
            database: configService.get<string>('POSTGRES_DB'),
            entities: [PartInformation, Material, MaterialPrice, Machine, SupplyChain],
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