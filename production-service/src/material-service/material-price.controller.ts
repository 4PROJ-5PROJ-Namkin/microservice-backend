import { Controller, Post, Body, Param, ParseIntPipe, Get, Delete, HttpCode, HttpStatus, UseGuards } from '@nestjs/common';
import { MaterialPriceService } from './material-price.service';
import { CreateMaterialPriceDto, CreateManyMaterialPricesDto } from './dto/material-price-service-dto/create-material-price.dto';
import { DeleteManyMaterialPricesDto, DeleteMaterialPriceDto } from './dto/material-price-service-dto/delete-material-price.dto';
import { ApiTags } from '@nestjs/swagger';
import { RateLimiterGuard } from 'nestjs-rate-limiter';

@ApiTags('Materials')
@UseGuards(RateLimiterGuard)
@Controller('materials/prices')
export class MaterialPriceController {
    constructor(private readonly materialPriceService: MaterialPriceService) { }

    @Get(':materialId')
    async findMaterialPrices(@Param('materialId', ParseIntPipe) materialId: number) {
        return this.materialPriceService.findMaterialPrices(materialId);
    }

    @Post(':materialId')
    async updateOrCreateMaterialPrice(@Param('materialId', ParseIntPipe) materialId: number,
        @Body() createMaterialPriceDto: CreateMaterialPriceDto
    ) {
        return this.materialPriceService.updateOrCreateMaterialPrice(materialId, createMaterialPriceDto);
    }

    @Post(':materialId/many-prices')
    async updateOrCreateManyMaterialPrices(@Param('materialId', ParseIntPipe) materialId: number,
        @Body() createManyMaterialPricesDto: CreateManyMaterialPricesDto
    ) {
        return this.materialPriceService.updateOrCreateManyMaterialPrices(materialId, createManyMaterialPricesDto);
    }

    @Delete(':materialId/many-prices')
    @HttpCode(HttpStatus.NO_CONTENT)
    async deleteManyMaterialPrices(@Param('materialId', ParseIntPipe) materialId: number,
        @Body() deleteManyMaterialPricesDto: DeleteManyMaterialPricesDto) {
        return this.materialPriceService.deleteManyMaterialPrices(materialId, deleteManyMaterialPricesDto);
    }

    @Delete(':materialId')
    @HttpCode(HttpStatus.NO_CONTENT)
    async deleteMaterialPrice(@Param('materialId', ParseIntPipe) materialId: number,
        @Body() deleteMaterialPriceDto: DeleteMaterialPriceDto) {
        return this.materialPriceService.deleteMaterialPrice(materialId, deleteMaterialPriceDto);
    }
}
