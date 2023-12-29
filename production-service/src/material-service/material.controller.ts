import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus, HttpCode, ParseIntPipe, UseGuards } from '@nestjs/common';
import { MaterialService } from './material.service';
import { CreateManyMaterialsDto, CreateMaterialDto } from './dto/material-service-dto/create-material.dto';
import { UpdateManyMaterialsDto, UpdateMaterialDto } from './dto/material-service-dto/update-material.dto';
import { DeleteManyMaterialsDto } from './dto/material-service-dto/delete-material.dto';
import { CreateMaterialPartInformationsDto } from './dto/material-part-informations-dto/create-part-information-materials.dto';
import { DeleteMaterialPartInformationsDto } from './dto/material-part-informations-dto/delete-part-information-materials.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
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
  @ApiResponse({ status: HttpStatus.OK, description: 'Material found' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Material not found' })
  async findMaterial(@Param('id', ParseIntPipe) id: number) {
    return this.materialService.findMaterial(id);
  }

  @Get()
  @ApiResponse({ status: HttpStatus.OK, description: 'All materials found' })
  async findAllMaterials() {
    return this.materialService.findAllMaterials();
  }

  @Post()
  @ApiResponse({ status: HttpStatus.CREATED, description: 'Material created' })
  @ApiResponse({ status: HttpStatus.CONFLICT, description: 'Material already exists' })
  @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, description: 'Error in creating material' })
  async createMaterial(@Body() createMaterialDto: CreateMaterialDto) {
    const createdMaterial = await this.materialService.createMaterial(createMaterialDto);
    await this.kafkaService.sendMessage('materials', createdMaterial);
    return createdMaterial;
  }

  @Post('many-materials')
  @ApiResponse({ status: HttpStatus.CREATED, description: 'Materials created' })
  @ApiResponse({ status: HttpStatus.CONFLICT, description: 'Some materials already exist' })
  @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, description: 'Error in creating multiple materials' })
  async createManyMaterials(@Body() createManyMaterialsDto: CreateManyMaterialsDto) {
    const createdManyMaterials = await this.materialService.createManyMaterials(createManyMaterialsDto.materials);
    for (const material of createdManyMaterials) {
      await this.kafkaService.sendMessage('materials', material);
    }
    return createdManyMaterials;
  }

  @Patch('many-materials')
  @ApiResponse({ status: HttpStatus.OK, description: 'Material updated' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Material not found' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Material ID does not match' })
  @ApiResponse({ status: HttpStatus.CONFLICT, description: 'Another material with the same name already exists' })
  @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, description: 'Error updating material' })
  async updateManyMaterials(@Body() updateManyMaterialsDto: UpdateManyMaterialsDto) {
    return this.materialService.updateManyMaterials(updateManyMaterialsDto);
  }

  @Patch(':id')
  @ApiResponse({ status: HttpStatus.OK, description: 'Material updated' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Material not found' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Material ID does not match' })
  @ApiResponse({ status: HttpStatus.CONFLICT, description: 'Another material with the same name already exists' })
  @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, description: 'Error updating material' })
  async updateMaterial(@Param('id', ParseIntPipe) id: number, @Body() updateMaterialDto: UpdateMaterialDto) {
    return this.materialService.updateMaterial(id, updateMaterialDto);
  }

  @Delete('many-materials')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiResponse({ status: HttpStatus.NO_CONTENT, description: 'Materials deleted' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'One or more materials not found' })
  async deleteManyMaterials(@Body() deleteManyMaterialsDto: DeleteManyMaterialsDto): Promise<void> {
    await this.materialService.deleteManyMaterials(deleteManyMaterialsDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiResponse({ status: HttpStatus.NO_CONTENT, description: 'Material deleted' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Material not found' })
  async deleteMaterial(@Param('id', ParseIntPipe) id: number) {
    return this.materialService.deleteMaterial(id);
  }

  @Post(':id/part-informations')
  @ApiResponse({ status: HttpStatus.OK, description: 'Part information added to material' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Material not found' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'One or more Part Information not found' })
  async addPartInformationToMaterial(@Param('id', ParseIntPipe) id: number,
    @Body() createMaterialPartInformationsDto: CreateMaterialPartInformationsDto
  ) {
    return this.materialService.addPartInformationToMaterial(id, createMaterialPartInformationsDto);
  }

  @Delete(':id/part-informations')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiResponse({ status: HttpStatus.NO_CONTENT, description: 'Part information removed from material' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Material not found' })
  @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, description: 'Error removing part information from material' })
  async deletePartInformationToMaterial(@Param('id', ParseIntPipe) id: number,
    @Body() deleteMaterialPartInformationsDto: DeleteMaterialPartInformationsDto
  ) {
    return this.materialService.deletePartInformationFromMaterial(id, deleteMaterialPartInformationsDto);
  }

}
