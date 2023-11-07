import { Controller, Post, Body, Param, ParseIntPipe } from '@nestjs/common';
import { MaterialPriceService } from './material-price.service';
import { CreateMaterialPriceDto } from './dto/material-price-service-dto/create-material-price.dto';

@Controller('materials/prices')
export class MaterialPriceController {
    constructor(private readonly materialPriceService: MaterialPriceService) { }

    @Post(':materialId')
    async createMaterialPrice(@Param('materialId', ParseIntPipe) materialId: number,
        @Body() createMaterialPriceDto: CreateMaterialPriceDto
    ) {
        return this.materialPriceService.updateOrCreateMaterialPrice(materialId, createMaterialPriceDto);
    }
}
