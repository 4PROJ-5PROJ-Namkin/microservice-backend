import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContractsService } from './contract.service';
import { Contract } from './entities/contract.entity';
import { ContractsController } from './contract.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Contract])],
  controllers: [ContractsController],
  providers: [ContractsService]
})
export class ContractsModule { }
