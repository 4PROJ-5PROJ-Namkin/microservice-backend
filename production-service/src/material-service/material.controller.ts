import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus, HttpCode, ParseIntPipe, UseGuards } from '@nestjs/common';
import { MaterialService } from './material.service';
import { CreateManyMaterialsDto, CreateMaterialDto } from './dto/material-service-dto/create-material.dto';
import { UpdateManyMaterialsDto, UpdateMaterialDto } from './dto/material-service-dto/update-material.dto';
import { DeleteManyMaterialsDto } from './dto/material-service-dto/delete-material.dto';
import { CreateMaterialPartInformationsDto } from './dto/material-part-informations-dto/create-part-information-materials.dto';
import { DeleteMaterialPartInformationsDto } from './dto/material-part-informations-dto/delete-part-information-materials.dto';
import { ApiTags } from '@nestjs/swagger';
import { RateLimiterGuard } from 'nestjs-rate-limiter';
import { KafkaService } from 'src/kafka-producer-service/kafka-producer.service';

@ApiTags('Materials')
@UseGuards(RateLimiterGuard)
@Controller('materials')
export class MaterialController {
  constructor(
    private readonly materialService: MaterialService,
    private readonly kafkaService: KafkaService
  ) { }

  @Get(':id')
  async findMaterial(@Param('id', ParseIntPipe) id: number) {
    return this.materialService.findMaterial(id);
  }

  @Get()
  async findAllMaterials() {
    return this.materialService.findAllMaterials();
  }

  @Post()
  async createMaterial(@Body() createMaterialDto: CreateMaterialDto) {
    const createdMaterial = await this.materialService.createMaterial(createMaterialDto);
    await this.kafkaService.sendMessage('materials', createdMaterial);
    return createdMaterial;
  }

  @Post('many-materials')
  async createManyMaterials(@Body() createManyMaterialsDto: CreateManyMaterialsDto) {
    const createdManyMaterials = await this.materialService.createManyMaterials(createManyMaterialsDto.materials);
    for (const material of createdManyMaterials) {
      await this.kafkaService.sendMessage('materials', material);
    }
    return createdManyMaterials;
  }

  @Patch('many-materials')
  async updateManyMaterials(@Body() updateManyMaterialsDto: UpdateManyMaterialsDto) {
    return this.materialService.updateManyMaterials(updateManyMaterialsDto);
  }

  @Patch(':id')
  async updateMaterial(@Param('id', ParseIntPipe) id: number, @Body() updateMaterialDto: UpdateMaterialDto) {
    return this.materialService.updateMaterial(id, updateMaterialDto);
  }

  @Delete('many-materials')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteManyMaterials(@Body() deleteManyMaterialsDto: DeleteManyMaterialsDto): Promise<void> {
    await this.materialService.deleteManyMaterials(deleteManyMaterialsDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteMaterial(@Param('id', ParseIntPipe) id: number) {
    return this.materialService.deleteMaterial(id);
  }

  @Post(':id/part-informations')
  async addPartInformationToMaterial(@Param('id', ParseIntPipe) id: number,
    @Body() createMaterialPartInformationsDto: CreateMaterialPartInformationsDto
  ) {
    return this.materialService.addPartInformationToMaterial(id, createMaterialPartInformationsDto);
  }

  @Delete(':id/part-informations')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deletePartInformationToMaterial(@Param('id', ParseIntPipe) id: number,
    @Body() deleteMaterialPartInformationsDto: DeleteMaterialPartInformationsDto
  ) {
    return this.materialService.deletePartInformationFromMaterial(id, deleteMaterialPartInformationsDto);
  }

}
