import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { PartInformationService } from './part-information.service';
import { CreateManyPartInformationDto, CreatePartInformationDto } from './dto/part-information/create-part-information.dto';
import { UpdateManyPartInformationDto, UpdateOnePartInformationDto } from './dto/part-information/update-part-information.dto';
import { DeletePartInformationDto } from './dto/part-information/delete-part-information.dto';
import { CreatePartInformationMaterialsDto } from './dto/part-information-materials/create-part-information-materials.dto';
import { DeletePartInformationMaterialsDto } from './dto/part-information-materials/delete-part-information-materials.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { RateLimiterGuard } from 'nestjs-rate-limiter';
import { KafkaService } from 'src/kafka-producer-service/kafka-producer.service';
import { InjectRepository } from '@nestjs/typeorm';
import { PartInformation } from './entities/part-information.entity';
import { Repository } from 'typeorm';

@ApiTags('Part Information')
@UseGuards(RateLimiterGuard)
@Controller('part-information')
export class PartInformationController {
  constructor(
    private readonly partInformationService: PartInformationService,
    private readonly kafkaService: KafkaService,
    @InjectRepository(PartInformation)
    private readonly partInformationRepository: Repository<PartInformation>,
  ) { }

  @Get()
  @ApiResponse({ status: HttpStatus.OK, description: 'Part informations found' })
  async findAllPartInformations() {
    return this.partInformationService.findAllPartInformations();
  }

  @Get(':id')
  @ApiResponse({ status: HttpStatus.OK, description: 'Part information found' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Part information not found' })
  async findOnePartInformation(@Param('id', ParseIntPipe) id: number) {
    return this.partInformationService.findOnePartInformation(id);
  }

  @Post()
  @ApiResponse({ status: HttpStatus.CREATED, description: 'Part information created' })
  @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, description: 'Error in creating part information' })
  async createPartInformation(@Body() createPartInformationDto: CreatePartInformationDto) {
    const createdPart = await this.partInformationService.createPartInformation(createPartInformationDto);
    await this.kafkaService.sendMessage('part_information', createdPart, 'POST');
    return createdPart;
  }

  @Post('many-part-informations')
  @ApiResponse({ status: HttpStatus.CREATED, description: 'Part informations created' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Invalid input data' })
  @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, description: 'Error in creating part information entries' })
  async createManyPartInformations(@Body() createManyPartInformationDto: CreateManyPartInformationDto) {
    const createdManyParts = await this.partInformationService.createManyPartInformations(createManyPartInformationDto);
    for (const parts of createdManyParts) {
      await this.kafkaService.sendMessage('part_information', parts, 'POST');
    }
    return createdManyParts;
  }

  @Patch('many-part-informations')
  @ApiResponse({ status: HttpStatus.OK, description: 'Part informations updated' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Invalid input data' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Part information not found' })
  @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, description: 'Error in updating part information entries' })
  async updateManyPartInformations(@Body() updateManyPartInformationDto: UpdateManyPartInformationDto) {
    const updateManyParts = await this.partInformationService.updateManyPartInformations(updateManyPartInformationDto);
    for (const parts of updateManyParts) {
      await this.kafkaService.sendMessage('part_information', parts, 'PATCH');
    }
    return updateManyParts;
  }

  @Patch(':id')
  @ApiResponse({ status: HttpStatus.OK, description: 'Part information updated' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Material ID does not match' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Part information not found' })
  @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, description: 'Error in updating part information entries' })
  async updateOnePartInformation(
    @Param('id', ParseIntPipe) id: number, @Body() updatePartInformationDto: UpdateOnePartInformationDto) {
      const updatedPart = await this.partInformationService.updateOnePartInformation(id, updatePartInformationDto);
      await this.kafkaService.sendMessage('part_information', updatedPart, 'PATCH');
      return updatedPart;
  }

  @Delete('many-part-informations')
  @HttpCode(HttpStatus.NO_CONTENT)
  async removeManyPartInformation(@Body() deletePartInformationDto: DeletePartInformationDto) {
    return this.partInformationService.deleteManyPartInformation(deletePartInformationDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiResponse({ status: HttpStatus.NO_CONTENT, description: 'Part information deleted' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Part information not found' })
  async removePartInformation(@Param('id', ParseIntPipe) id: number) {
    const partInformationToDelete = await this.partInformationRepository.findOne({ where: { id: id } });
    await this.kafkaService.sendMessage('part_information', partInformationToDelete, 'DELETE');
    return this.partInformationService.deletePartInformation(id);
  }

  @Post(':id/materials')
  @ApiResponse({ status: HttpStatus.NO_CONTENT, description: 'Part informations deleted' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Part information not found' })
  async addPartInformationToMaterial(@Param('id', ParseIntPipe) id: number,
    @Body() createPartInformationMaterialsDto: CreatePartInformationMaterialsDto
  ) {
    return this.partInformationService.addMaterialToPartInformation(id, createPartInformationMaterialsDto);
  }

  @Delete(':id/materials')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiResponse({ status: HttpStatus.NO_CONTENT, description: 'Material deleted from part information' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Part information or material not found' })
  async deletePartInformationToMaterial(@Param('id', ParseIntPipe) id: number,
    @Body() deletePartInformationMaterialsDto: DeletePartInformationMaterialsDto
  ) {
    return this.partInformationService.deleteMaterialFromPartInformation(id, deletePartInformationMaterialsDto);
  }

}
