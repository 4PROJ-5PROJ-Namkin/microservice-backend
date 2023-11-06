import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Material } from './entities/material.entity';
import { MaterialPrice } from './entities/material-price.entity';
import { CreateMaterialDto } from './dto/material-service-dto/create-material.dto';

@Injectable()
export class MaterialService {
  constructor(
    @InjectRepository(Material)
    private readonly materialRepository: Repository<Material>,
    @InjectRepository(MaterialPrice)
    private readonly materialPriceRepository: Repository<MaterialPrice>,
  ) { }

  async createMaterial(createMaterialDto: CreateMaterialDto) : Promise<CreateMaterialDto> {
    const materialFound = await this.materialRepository.findOne({ where: { name: createMaterialDto.name } });
    if (materialFound) {
      throw new HttpException({
        message: 'This material already exists.',
        statusCode: HttpStatus.CONFLICT
      }, HttpStatus.CONFLICT);
    }

    try {
      const material = this.materialRepository.create(createMaterialDto);
      return this.materialRepository.save(material);
    } catch (error) {
      throw new HttpException({
        message: 'Error in creating a material file information.',
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR
      }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async createManyMaterials(createMaterialDtos: CreateMaterialDto[]) : Promise<CreateMaterialDto[]> {
    const conflicts = [];

    for (const dto of createMaterialDtos) {
      const materialFound = await this.materialRepository.findOne({ where: { name: dto.name } });
      if (materialFound) {
        conflicts.push(dto.name);
      }
    }

    if (conflicts.length > 0) {
      throw new HttpException(
        {
          message: `These materials already exist: ${conflicts.join(', ')}`,
          statusCode: HttpStatus.CONFLICT,
        },
        HttpStatus.CONFLICT
      );
    }

    try {
      const materials = createMaterialDtos.map(dto => this.materialRepository.create(dto));
      return this.materialRepository.save(materials);
    } catch (error) {
      throw new HttpException(
        {
          message: 'Error in creating multiple material file information.',
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        },
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
}