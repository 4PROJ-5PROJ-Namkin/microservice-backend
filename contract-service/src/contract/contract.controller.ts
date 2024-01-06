import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { ContractsService } from './contract.service';
import { CreateContractInput } from './dto/create-contract.input';
import { UpdateContractsInput } from './dto/update-contract.input';

@Controller('contracts')
export class ContractsController {
  constructor(private readonly contractsService: ContractsService) {}

  @Post()
  create(@Body() body: any) {
  const createContractInput = new CreateContractInput(body.contract_number, body.client_name, body.date, body.cash, body.parts );
  return this.contractsService.create(createContractInput);
}
  @Get()
  async findAll() {
    return this.contractsService.findAllContracts();
  }

  @Get(':contract_number')
  findOne(@Param('contract_number') contract_number: string) {
    return this.contractsService.findOneById(contract_number);
  }
  @Put(':contract_number')
  update(@Body() body: any, @Param('contract_number') contract_number) {
  const updateContractInput = new UpdateContractsInput(body.client_name, body.date, body.cash, body.parts );
  return this.contractsService.update(contract_number, updateContractInput);
}
  @Delete(':contract_number')
  remove(@Param('contract_number') contract_number: string) {
    return this.contractsService.remove(contract_number);
  }
}
