import { Module } from '@nestjs/common';
import { AppController } from './production.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppService } from './production.service';
import { productionDbConfig } from './config/production.database';

@Module({
  imports: [TypeOrmModule.forRootAsync(productionDbConfig)],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
