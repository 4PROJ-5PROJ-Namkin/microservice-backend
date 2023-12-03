import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { productionDbConfig } from './config/production.database';
import { MaterialService } from './material-service/material.service';
import { MaterialController } from './material-service/material.controller';
import { MaterialPrice } from './material-service/entities/material-price.entity';
import { Material } from './material-service/entities/material.entity';
import { MaterialPriceController } from './material-service/material-price.controller';
import { MaterialPriceService } from './material-service/material-price.service';
import { PartInformation } from './part-information-service/entities/part-information.entity';
import { PartInformationController } from './part-information-service/part-information.controller';
import { PartInformationService } from './part-information-service/part-information.service';
import { MachineController } from './supply-chain-service/machine-service/machine.controller';
import { MachineService } from './supply-chain-service/machine-service/machine.service';
import { Machine } from './supply-chain-service/entities/machine.entity';
import { SupplyChainController } from './supply-chain-service/supply-chain.controller';
import { SupplyChain } from './supply-chain-service/entities/supply-chain.entity';
import { SupplyChainService } from './supply-chain-service/supply-chain.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { RateLimiterGuard, RateLimiterModule } from 'nestjs-rate-limiter';
import { APP_GUARD } from '@nestjs/core';
import { KafkaService } from './kafka-producer-service/kafka-producer.service';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..'),
      serveRoot: '/api/v1/production',
      renderPath: '/api/v1/production/production-swagger-spec.json'
    }),
    RateLimiterModule.register({
      points: 50,
      duration: 60,
    }),
    TypeOrmModule.forRootAsync(productionDbConfig),
    TypeOrmModule.forFeature([Material, MaterialPrice, PartInformation, Machine, SupplyChain])
  ],
  controllers: [MaterialController, MaterialPriceController, PartInformationController, MachineController, SupplyChainController],
  providers: [MaterialService, MaterialPriceService, PartInformationService, MachineService, SupplyChainService, KafkaService,
    {
      provide: APP_GUARD,
      useClass: RateLimiterGuard,
    }]
})
export class ProductionModule { }
