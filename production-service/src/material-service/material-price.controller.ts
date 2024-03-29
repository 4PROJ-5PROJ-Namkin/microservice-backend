import { Controller, Post, Body, Param, ParseIntPipe, Get, Delete, HttpCode, HttpStatus, UseGuards } from '@nestjs/common';
import { MaterialPriceService } from './material-price.service';
import { CreateMaterialPriceDto, CreateManyMaterialPricesDto } from './dto/material-price-service-dto/create-material-price.dto';
import { DeleteManyMaterialPricesDto, DeleteMaterialPriceDto } from './dto/material-price-service-dto/delete-material-price.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { RateLimiterGuard } from 'nestjs-rate-limiter';
import { KafkaService } from 'src/kafka-producer-service/kafka-producer.service';
import { InjectRepository } from '@nestjs/typeorm';
import { MaterialPrice } from './entities/material-price.entity';
import { Repository } from 'typeorm';

@ApiTags('Materials')
@UseGuards(RateLimiterGuard)
@Controller('materials/prices')
export class MaterialPriceController {
    constructor(
        private readonly materialPriceService: MaterialPriceService,
        private readonly kafkaService: KafkaService,
        @InjectRepository(MaterialPrice)
        private readonly materialPriceRepository: Repository<MaterialPrice>
    ) { }

    @Get(':materialId')
    @ApiResponse({ status: HttpStatus.OK, description: 'Material prices found' })
    @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Material not found/No prices found for the Material' })
    async findMaterialPrices(@Param('materialId', ParseIntPipe) materialId: number) {
        return this.materialPriceService.findMaterialPrices(materialId);
    }

    @Post(':materialId')
    @ApiResponse({ status: HttpStatus.CREATED, description: 'Material price created' })
    @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Material not found' })
    async updateOrCreateMaterialPrice(@Param('materialId', ParseIntPipe) materialId: number,
        @Body() createMaterialPriceDto: CreateMaterialPriceDto
    ) {
        const createdMaterialPrice = await this.materialPriceService.updateOrCreateMaterialPrice(materialId, createMaterialPriceDto);
        await this.kafkaService.sendMessage('material_prices', createdMaterialPrice, 'POST');
        return createdMaterialPrice;
    }

    @Post(':materialId/many-prices')
    @ApiResponse({ status: HttpStatus.CREATED, description: 'Material prices created' })
    @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Material not found' })
    async updateOrCreateManyMaterialPrices(@Param('materialId', ParseIntPipe) materialId: number,
        @Body() createManyMaterialPricesDto: CreateManyMaterialPricesDto
    ) {
        const createdManyMaterialPrices = await this.materialPriceService.updateOrCreateManyMaterialPrices(materialId, createManyMaterialPricesDto);
        for (const materialPrice of createdManyMaterialPrices) {
            await this.kafkaService.sendMessage('material_prices', materialPrice, 'POST');
        }
        return createdManyMaterialPrices;
    }

    @Delete(':materialId/many-prices')
    @HttpCode(HttpStatus.NO_CONTENT)
    @ApiResponse({ status: HttpStatus.NO_CONTENT, description: 'Material price deleted' })
    @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Material/Material Price not found.' })
    async deleteManyMaterialPrices(@Param('materialId', ParseIntPipe) materialId: number,
        @Body() deleteManyMaterialPricesDto: DeleteManyMaterialPricesDto) {
        return this.materialPriceService.deleteManyMaterialPrices(materialId, deleteManyMaterialPricesDto);
    }

    @Delete(':materialId')
    @HttpCode(HttpStatus.NO_CONTENT)
    @ApiResponse({ status: HttpStatus.NO_CONTENT, description: 'Material price deleted' })
    @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Material/Material Price not found' })
    async deleteMaterialPrice(@Param('materialId', ParseIntPipe) materialId: number,
        @Body() deleteMaterialPriceDto: DeleteMaterialPriceDto) {
        const materialPriceToDelete = await this.materialPriceRepository.findOne({
            where: {
                material: { id: materialId },
                price: deleteMaterialPriceDto.price,
                date: deleteMaterialPriceDto.date
            }
        })
        await this.kafkaService.sendMessage('material_prices', materialPriceToDelete, 'DELETE');
        return this.materialPriceService.deleteMaterialPrice(materialId, deleteMaterialPriceDto);
    }
}
