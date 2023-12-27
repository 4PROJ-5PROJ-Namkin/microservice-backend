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

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.contractsService.findOneById(id);
  }
  @Put(':id')
  update(@Body() body: any, @Param('id') id) {
  const updateContractInput = new UpdateContractsInput(id, body.contract_number, body.client_name, body.date, body.cash, body.parts );
  return this.contractsService.update(id, updateContractInput);
}
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.contractsService.remove(id);
  }
}
