import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { PartInformation } from './entities/part-information.entity';
import { CreateManyPartInformationDto, CreatePartInformationDto } from './dto/part-information/create-part-information.dto';
import { UpdateManyPartInformationDto, UpdatePartInformationDto } from './dto/part-information/update-part-information.dto';
import { DeletePartInformationDto } from './dto/part-information/delete-part-information.dto';
import { CreatePartInformationMaterialsDto } from './dto/part-information-materials/create-part-information-materials.dto';
import { Material } from 'src/material-service/entities/material.entity';
import { DeletePartInformationMaterialsDto } from './dto/part-information-materials/delete-part-information-materials.dto';

@Injectable()
export class PartInformationService {
  constructor(
    @InjectRepository(PartInformation)
    private readonly partInformationRepository: Repository<PartInformation>,
    @InjectRepository(Material)
    private readonly materialRepository: Repository<Material>
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

  async updateOnePartInformation(id: number, updatePartInformationDto: UpdatePartInformationDto): Promise<PartInformation> {
    if (updatePartInformationDto.id != id) {
      throw new HttpException("Material ID doesn't match.", HttpStatus.BAD_REQUEST);
    }

    const partInformation = await this.partInformationRepository.preload({
      id: id,
      ...updatePartInformationDto,
    });

    if (!partInformation) {
      throw new HttpException('Part information not found', HttpStatus.NOT_FOUND);
    }

    try {
      return this.partInformationRepository.save(partInformation);
    } catch (error) {
      throw new HttpException('Error in updating part information entries.', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async updateManyPartInformations(updateManyPartInformationDto: UpdateManyPartInformationDto): Promise<PartInformation[]> {
    if (!updateManyPartInformationDto.partInformations || !Array.isArray(updateManyPartInformationDto.partInformations)) {
      throw new HttpException('Invalid input data. "partInformation" should be an array of part information data.', HttpStatus.BAD_REQUEST);
    }

    const updatePromises = updateManyPartInformationDto.partInformations.map(async (updateDto) => {
      const partInformation = await this.partInformationRepository.preload({
        id: updateDto.id,
        ...updateDto,
      });

      if (!partInformation) {
        throw new HttpException(`Part information with ID ${updateDto.id} not found`, HttpStatus.NOT_FOUND);
      }

      return this.partInformationRepository.save(partInformation);
    });

    return Promise.all(updatePromises);
  }

  async deletePartInformation(id: number): Promise<void> {
    const result = await this.partInformationRepository.delete(id);
    if (result.affected === 0) {
      throw new HttpException('Part information not found', HttpStatus.NOT_FOUND);
    }
  }

  async deleteManyPartInformation(deleteManyMaterialsDto: DeletePartInformationDto): Promise<void> {
    const idsToDelete = deleteManyMaterialsDto.partInformations.map(partInformation => partInformation.id);

    const foundPartInformations = await this.partInformationRepository.find({
      where: { id: In(idsToDelete) },
    });

    const foundIDs = foundPartInformations.map(partInformation => partInformation.id);
    const notFoundIDs = idsToDelete.filter(id => !foundIDs.includes(id));

    if (notFoundIDs.length > 0) {
      throw new HttpException(`Part information with IDs ${notFoundIDs.join(', ')} not found`, HttpStatus.NOT_FOUND);
    }

    await this.partInformationRepository.delete(idsToDelete);
  }

  async addMaterialToPartInformation(partInformationId: number, createPartInformationMaterialsDto: CreatePartInformationMaterialsDto): Promise<PartInformation> {
    const partInformation = await this.partInformationRepository.findOne({
      where: { id: partInformationId },
      relations: ['materials']
    });

    if (!partInformation) {
      throw new HttpException('Part Information not found.', HttpStatus.NOT_FOUND);
    }

    const materialEntities = await this.materialRepository.findByIds(createPartInformationMaterialsDto.materialIds);

    if (materialEntities.length !== createPartInformationMaterialsDto.materialIds.length) {
      throw new HttpException('One or more Materials not found.', HttpStatus.NOT_FOUND);
    }

    for (const material of materialEntities) {
      if (!partInformation.materials.some(pm => pm.id === material.id)) {
        partInformation.materials.push(material);
      }
    }

    await this.partInformationRepository.save(partInformation);
    return partInformation;
  }

  async deleteMaterialFromPartInformation(id: number, deletePartInformationMaterialsDto: DeletePartInformationMaterialsDto): Promise<void> {
    const partInformation = await this.partInformationRepository.findOne({
      where: { id: id },
      relations: ['materials'],
    });

    if (!partInformation) {
      throw new HttpException('Part Information not found.', HttpStatus.NOT_FOUND);
    }

    const materialsToRemove = partInformation.materials.filter(material =>
      deletePartInformationMaterialsDto.materialIds.includes(material.id)
    );

    if (materialsToRemove.length === 0) {
      return;
    }

    await this.partInformationRepository
      .createQueryBuilder()
      .relation(PartInformation, 'materials')
      .of(partInformation)
      .remove(materialsToRemove);
  }
}