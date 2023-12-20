import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { PartInformationService } from './part-information.service';
import { CreateManyPartInformationDto, CreatePartInformationDto } from './dto/part-information/create-part-information.dto';
import { UpdateManyPartInformationDto, UpdatePartInformationDto } from './dto/part-information/update-part-information.dto';
import { DeletePartInformationDto } from './dto/part-information/delete-part-information.dto';
import { CreatePartInformationMaterialsDto } from './dto/part-information-materials/create-part-information-materials.dto';
import { DeletePartInformationMaterialsDto } from './dto/part-information-materials/delete-part-information-materials.dto';
import { ApiTags } from '@nestjs/swagger';
import { RateLimiterGuard } from 'nestjs-rate-limiter';
import { KafkaService } from 'src/kafka-producer-service/kafka-producer.service';

@ApiTags('Part Information')
@UseGuards(RateLimiterGuard)
@Controller('part-information')
export class PartInformationController {
  constructor(
    private readonly partInformationService: PartInformationService,
    private readonly kafkaService: KafkaService
    ) { }

  @Get()
  async findAllPartInformations() {
    return this.partInformationService.findAllPartInformations();
  }

  @Get(':id')
  async findOnePartInformation(@Param('id', ParseIntPipe) id: number) {
    return this.partInformationService.findOnePartInformation(id);
  }

  @Post()
  async createPartInformation(@Body() createPartInformationDto: CreatePartInformationDto) {
    const createdPart = this.partInformationService.createPartInformation(createPartInformationDto);
    await this.kafkaService.sendMessage('part_information', createdPart);
    return createdPart;
  }

  @Post('many-part-informations')
  async createManyPartInformations(@Body() createManyPartInformationDto: CreateManyPartInformationDto) {
    return this.partInformationService.createManyPartInformations(createManyPartInformationDto);
  }

  @Patch('many-part-informations')
  async updateManyPartInformations(@Body() updateManyPartInformationDto: UpdateManyPartInformationDto) {
    return this.partInformationService.updateManyPartInformations(updateManyPartInformationDto);
  }

  @Patch(':id')
  async updateOnePartInformation(
    @Param('id', ParseIntPipe) id: number, @Body() updatePartInformationDto: UpdatePartInformationDto) {
    return this.partInformationService.updateOnePartInformation(id, updatePartInformationDto);
  }

  @Delete('many-part-informations')
  @HttpCode(HttpStatus.NO_CONTENT)
  async removeManyPartInformation(@Body() deletePartInformationDto: DeletePartInformationDto) {
    return this.partInformationService.deleteManyPartInformation(deletePartInformationDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async removePartInformation(@Param('id', ParseIntPipe) id: number) {
    return this.partInformationService.deletePartInformation(id);
  }

  @Post(':id/materials')
  async addPartInformationToMaterial(@Param('id', ParseIntPipe) id: number,
    @Body() createPartInformationMaterialsDto: CreatePartInformationMaterialsDto
  ) {
    return this.partInformationService.addMaterialToPartInformation(id, createPartInformationMaterialsDto);
  }

  @Delete(':id/materials')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deletePartInformationToMaterial(@Param('id', ParseIntPipe) id: number,
    @Body() deletePartInformationMaterialsDto: DeletePartInformationMaterialsDto
  ) {
    return this.partInformationService.deleteMaterialFromPartInformation(id, deletePartInformationMaterialsDto);
  }

}
