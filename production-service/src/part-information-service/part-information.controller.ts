import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { PartInformationService } from './part-information.service';
import { CreateManyPartInformationDto, CreatePartInformationDto } from './dto/part-information/create-part-information.dto';

@Controller('part-information')
export class PartInformationController {
  constructor(private readonly partInformationService: PartInformationService) { }

  @Get('many-part-information')
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
}
