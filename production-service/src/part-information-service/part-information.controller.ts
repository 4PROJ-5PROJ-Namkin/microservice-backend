import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { PartInformationService } from './part-information.service';
import { CreateManyPartInformationDto, CreatePartInformationDto } from './dto/part-information/create-part-information.dto';
import { UpdateManyPartInformationDto, UpdatePartInformationDto } from './dto/part-information/update-part-information.dto';
import { DeletePartInformationDto } from './dto/part-information/delete-part-information.dto';
import { CreatePartInformationMaterialsDto } from './dto/part-information-materials/create-part-information-materials.dto';
import { DeletePartInformationMaterialsDto } from './dto/part-information-materials/delete-part-information-materials.dto';

@Controller('part-information')
export class PartInformationController {
  constructor(private readonly partInformationService: PartInformationService) { }

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
    return this.partInformationService.createPartInformation(createPartInformationDto);
  }

  @Post('many-part-information')
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
