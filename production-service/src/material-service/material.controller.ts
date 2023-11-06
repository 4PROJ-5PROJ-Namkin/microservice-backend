import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus } from '@nestjs/common';
import { MaterialService } from './material.service';
import { CreateMaterialDto } from './dto/material-service-dto/create-material.dto';

@Controller('materials')
export class MaterialController {
  constructor(private readonly materialService: MaterialService) { }

  @Post()
  async create(@Body() createMaterialDto: CreateMaterialDto) {
    return this.materialService.createMaterial(createMaterialDto);
  }

  @Post('many-materials')
  async createManyMaterials(@Body() createMaterialDtos: CreateMaterialDto[]) {
    return await this.materialService.createManyMaterials(createMaterialDtos);
  }
}
