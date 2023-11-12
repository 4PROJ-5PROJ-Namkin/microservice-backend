import { Body, Controller, Get, Post } from '@nestjs/common';
import { SupplyChainService } from './supply-chain.service';
import { CreateSupplyChainDto } from './dto/create-supply-chain.dto';

@Controller('supply-chain')
export class SupplyChainController {
  constructor(private readonly supplyChainService: SupplyChainService) { }

  @Post()
  async createSupplyChain(@Body() createSupplyChainDto: CreateSupplyChainDto) {
    return this.supplyChainService.createSupplyChain(createSupplyChainDto);
  }
}
