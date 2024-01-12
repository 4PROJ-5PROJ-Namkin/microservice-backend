import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContractsService } from './contract.service';
import { Contract } from './entities/contract.entity';
import { ContractsController } from './contract.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    TypeOrmModule.forFeature([Contract]),
    HttpModule,
  ],  controllers: [ContractsController],
  providers: [ContractsService]
})
export class ContractsModule { }
