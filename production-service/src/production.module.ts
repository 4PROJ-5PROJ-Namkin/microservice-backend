import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { productionDbConfig } from './config/production.database';
import { MaterialService } from './material-service/material.service';
import { MaterialController } from './material-service/material.controller';
import { MaterialPrice } from './material-service/entities/material-price.entity';
import { Material } from './material-service/entities/material.entity';
import { MaterialPriceController } from './material-service/material-price.controller';
import { MaterialPriceService } from './material-service/material-price.service';

@Module({
  imports: [TypeOrmModule.forRootAsync(productionDbConfig),
  TypeOrmModule.forFeature([Material, MaterialPrice])
  ],
  controllers: [MaterialController, MaterialPriceController],
  providers: [MaterialService, MaterialPriceService]
})
export class ProductionModule {}
