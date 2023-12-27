import { TypeOrmModuleAsyncOptions, TypeOrmModuleOptions } from "@nestjs/typeorm";
import { ConfigService } from '@nestjs/config';
export default class TypeOrmConfig {
    static getUserOrmConfig(configService: ConfigService): TypeOrmModuleOptions;
}
export declare const userDbConfig: TypeOrmModuleAsyncOptions;
