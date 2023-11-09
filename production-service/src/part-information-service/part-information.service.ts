import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PartInformation } from './entities/part-information.entity';
import { CreateManyPartInformationDto, CreatePartInformationDto } from './dto/part-information/create-part-information.dto';

@Injectable()
export class PartInformationService {
  constructor(
    @InjectRepository(PartInformation)
    private readonly partInformationRepository: Repository<PartInformation>,
  ) { }

  async findOnePartInformation(id: number): Promise<PartInformation> {
    const partInformation = await this.partInformationRepository.findOne({ where: { id: id } });
    if (!partInformation) {
      throw new HttpException('Part information not found', HttpStatus.NOT_FOUND);
    }
    return partInformation;
  }

  async findAllPartInformations(): Promise<PartInformation[]> {
    return await this.partInformationRepository.find();
  }

  async createPartInformation(createPartInformationDto: CreatePartInformationDto): Promise<PartInformation> {
    try {
      const partInformation = this.partInformationRepository.create(createPartInformationDto);
      return await this.partInformationRepository.save(partInformation);
    } catch (error) {
      throw new HttpException('Error in creating a part information file information.', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async createManyPartInformations(createManyPartInformationsDto: CreateManyPartInformationDto): Promise<PartInformation[]> {
    if (!createManyPartInformationsDto.partInformations || !Array.isArray(createManyPartInformationsDto.partInformations)) {
      throw new HttpException('Invalid input data. "partInformation" should be an array of part information data.', HttpStatus.BAD_REQUEST);
    }

    try {
      const partInformations = createManyPartInformationsDto.partInformations.map((dto) =>
        this.partInformationRepository.create(dto),
      );
      return await this.partInformationRepository.save(partInformations);
    } catch (error) {
      throw new HttpException('Error in creating part information entries.', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}