import { Body, Controller, Get, Param, ParseUUIDPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { SupplyChainService } from './supply-chain.service';
import { CreateManySupplyChainDto, CreateSupplyChainDto } from './dto/create-supply-chain.dto';
import { UpdateManySupplyChainDto, UpdateOneSupplyChainDto } from './dto/update-supply-chain.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { RateLimiterGuard } from 'nestjs-rate-limiter';
import { KafkaService } from 'src/kafka-producer-service/kafka-producer.service';

@ApiTags('Supply Chain')
@UseGuards(RateLimiterGuard)
@Controller('supply-chain')
export class SupplyChainController {
  constructor(
    private readonly supplyChainService: SupplyChainService,
    private readonly kafkaService: KafkaService
  ) { }

  @Get()
  @ApiResponse({ status: 200, description: 'Get all supply chains' })
  async findAllSupplyChains() {
    return this.supplyChainService.findAllSupplyChains();
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: 'Get a specific supply chain by ID' })
  @ApiResponse({ status: 404, description: 'Supply chain not found' })
  async findSupplyChain(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.supplyChainService.findOneSupplyChain(id);
  }

  @Post()
  @ApiResponse({ status: 201, description: 'Create a new supply chain' })
  @ApiResponse({ status: 404, description: 'One or more Machine IDs not found.' })
  @ApiResponse({ status: 404, description: 'One or more PartInformation IDs not found.' })
  @ApiResponse({ status: 500, description: 'Error in creating a supply chain file.' })
  @ApiResponse({ status: 500, description: 'Error in associating machines and parts with the supply chain.' })    
  async createSupplyChain(@Body() createSupplyChainDto: CreateSupplyChainDto) {
    const createdSupplyChain = await this.supplyChainService.createSupplyChain(createSupplyChainDto);
    await this.kafkaService.sendMessage('supply_chain', createdSupplyChain, 'POST');
    return createdSupplyChain;
  }

  @Post('many-supply-chain')
  @ApiResponse({ status: 201, description: 'Create multiple supply chains' })
  @ApiResponse({ status: 404, description: 'One or more Machine IDs not found.' })
  @ApiResponse({ status: 404, description: 'One or more PartInformation IDs not found.' })
  @ApiResponse({ status: 500, description: 'Error in creating a supply chain file.' })
  @ApiResponse({ status: 500, description: 'Error in associating machines and parts with the supply chain.' })  
  async createManySupplyChain(@Body() createManySupplyChainDto: CreateManySupplyChainDto) {
    const createdManySupplyChain = await this.supplyChainService.createManySupplyChains(createManySupplyChainDto);
    for (const supplyChain of createdManySupplyChain) {
      await this.kafkaService.sendMessage('supply_chain', supplyChain, 'POST');
    }
    return createdManySupplyChain;
  }

  @Patch('many-supply-chain')
  @ApiResponse({ status: 200, description: 'Update multiple supply chains' })
  @ApiResponse({ status: 404, description: 'One or multiple supply chain not found' })
  async updateManySupplyChain(@Body() updateManySupplyChainDto: UpdateManySupplyChainDto) {
    const updatedManySupplyChain = await this.supplyChainService.updateManySupplyChains(updateManySupplyChainDto);
    for (const supplyChain of updatedManySupplyChain) {
      await this.kafkaService.sendMessage('supply_chain', supplyChain, 'PATCH');
    }
    return updatedManySupplyChain;
  }

  @Patch(':id')
  @ApiResponse({ status: 200, description: 'Update a specific supply chain by ID' })
  @ApiResponse({ status: 404, description: 'Supply chain not found' })
  async updateSupplyChain(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() updateSupplyChainDto: UpdateOneSupplyChainDto
  ) {
    const updatedSupplyChain = await this.supplyChainService.updateOneSupplyChain(id, updateSupplyChainDto);
    await this.kafkaService.sendMessage('supply_chain', updatedSupplyChain, 'PATCH');
    return updatedSupplyChain;
  }
}