import { Body, Controller, Get, Param, ParseUUIDPipe, Patch, Post } from '@nestjs/common';
import { SupplyChainService } from './supply-chain.service';
import { CreateManySupplyChainDto, CreateSupplyChainDto } from './dto/create-supply-chain.dto';
import { UpdateManySupplyChainDto, UpdateSupplyChainDto } from './dto/update-supply-chain.dto';

@Controller('supply-chain')
export class SupplyChainController {
  constructor(private readonly supplyChainService: SupplyChainService) { }

  @Get()
  async findAllSupplyChains() {
    return this.supplyChainService.findAllSupplyChains();
  }

  @Get(':id')
  async findSupplyChain(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.supplyChainService.findOneSupplyChain(id);
  }

  @Post()
  async createSupplyChain(@Body() createSupplyChainDto: CreateSupplyChainDto) {
    return this.supplyChainService.createSupplyChain(createSupplyChainDto);
  }

  @Post('many-supply-chain')
  async createManySupplyChain(@Body() createManySupplyChainDto: CreateManySupplyChainDto) {
    return this.supplyChainService.createManySupplyChains(createManySupplyChainDto);
  }

  @Patch('many-supply-chain')
  async updateManySupplyChain(@Body() updateManySupplyChainDto: UpdateManySupplyChainDto) {
    return this.supplyChainService.updateManySupplyChains(updateManySupplyChainDto);
  }

  @Patch(':id')
  async updateSupplyChain(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() updateSupplyChainDto: UpdateSupplyChainDto
  ) {
    return this.supplyChainService.updateOneSupplyChain(updateSupplyChainDto);
  }

}
