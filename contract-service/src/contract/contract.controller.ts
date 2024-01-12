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
    const existingContract = await this.contractsService.exists(createContractInput.contract_number);
    await this.contractsService.checkIfPieceExists(createContractInput.parts);
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
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true, exceptionFactory: (errors) => new BadRequestException(errors) }))
  async update(@Body() updateContractsInput: UpdateContractsInput, @Param('contract_number') contract_number:string) {
      await this.contractsService.checkIfPieceExists(updateContractsInput.parts);
      return this.contractsService.update(contract_number, updateContractsInput);
  }

  @Delete(':contract_number')
  remove(@Param('contract_number') contract_number: string) {
    return this.contractsService.remove(contract_number);
  }
}
