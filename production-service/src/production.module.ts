import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { productionDbConfig } from './config/production.database';
import { MaterialService } from './material-service/material.service';
import { MaterialController } from './material-service/material.controller';
import { MaterialPrice } from './material-service/entities/material-price.entity';
import { Material } from './material-service/entities/material.entity';

@Module({
  imports: [TypeOrmModule.forRootAsync(productionDbConfig),
  TypeOrmModule.forFeature([Material, MaterialPrice])
  ],
  controllers: [MaterialController],
  providers: [MaterialService]
})
export class ProductionModule {}
