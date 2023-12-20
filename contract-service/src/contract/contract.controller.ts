import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { ContractsService } from './contract.service';
import { CreateContractInput } from './dto/create-contract.input';
import { UpdateContractsInput } from './dto/update-contract.input';
import { Role } from 'src/auth/guards/auth.enum';
import { Roles } from 'src/auth/guards/auth.decorator';

@Controller('contracts')
export class ContractsController {
  constructor(private readonly contractsService: ContractsService) {}

  @Post()
  // @Roles(Role.professor)
  create(@Body() createContractInput: CreateContractInput) {
    return this.contractsService.create(createContractInput);
  }

  @Get()
  // @Roles(Role.professor, Role.student)
  async findAll() {
    return this.contractsService.findAllContracts();
  }

  @Get(':id')
  // @Roles(Role.professor, Role.student)
  findOne(@Param('id') id: string) {
    return this.contractsService.findOneById(id);
  }

  @Put(':id')
  // @Roles(Role.professor)
  update(@Param('id') id: string, @Body() updateContractInput: UpdateContractsInput) {
    return this.contractsService.update(id, updateContractInput);
  }

  @Delete(':id')
  // @Roles(Role.professor)
  remove(@Param('id') id: string) {
    return this.contractsService.remove(id);
  }
}
