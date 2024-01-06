import { ContractsService } from './contract.service';
import { CreateContractInput } from './dto/create-contract.input';
import { UpdateContractsInput } from './dto/update-contract.input';
import { Body, Controller, UsePipes, ValidationPipe, Get, Post, Put, Delete, Param, BadRequestException } from '@nestjs/common';

@Controller('contracts')
export class ContractsController {
  constructor(private readonly contractsService: ContractsService) {}

  @Post()
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true, exceptionFactory: (errors) => new BadRequestException(errors) }))
  async create(@Body() createContractInput: CreateContractInput) {
    const existingContract = await this.contractsService.findOneById(createContractInput.contract_number);
    if (existingContract) {
      throw new BadRequestException('Contract number already exists');
    }
    return this.contractsService.create(createContractInput);
  }
  @Get()
  async findAll() {
    return this.contractsService.findAllContracts();
  }

  @Get(':contract_number')
  findOne(@Param('contract_number') id: string) {
    return this.contractsService.findOneById(id);
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
