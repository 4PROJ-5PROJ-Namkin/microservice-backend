import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Equal, In, Not, Repository } from 'typeorm';
import { Material } from './entities/material.entity';
import { MaterialPrice } from './entities/material-price.entity';
import { CreateMaterialDto } from './dto/material-service-dto/create-material.dto';
import { UpdateManyMaterialsDto, UpdateMaterialDto } from './dto/material-service-dto/update-material.dto';
import { DeleteManyMaterialsDto } from './dto/material-service-dto/delete-material.dto';

@Injectable()
export class MaterialService {
  constructor(
    @InjectRepository(Material)
    private readonly materialRepository: Repository<Material>,
    @InjectRepository(MaterialPrice)
    private readonly materialPriceRepository: Repository<MaterialPrice>,
    private readonly connection: Connection
  ) { }

  async findMaterial(id: number): Promise<Material> {
    const material = await this.materialRepository.findOne({ where: { id: id } });
    if (!material) {
      throw new HttpException('Material not found', HttpStatus.NOT_FOUND);
    }
    return material;
  }

  async findAllMaterials(): Promise<Material[]> {
    return await this.materialRepository.find();
  }

  async createMaterial(createMaterialDto: CreateMaterialDto): Promise<Material> {
    const materialFound = await this.materialRepository.findOne({ where: { name: createMaterialDto.name } });
    if (materialFound) {
      throw new HttpException('This material already exists.', HttpStatus.CONFLICT);
    }

    try {
      const material = this.materialRepository.create(createMaterialDto);
      return this.materialRepository.save(material);
    } catch (error) {
      throw new HttpException('Error in creating a material file information.', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async createManyMaterials(createMaterialDtos: CreateMaterialDto[]): Promise<Material[]> {
    const conflicts = [];

    for (const dto of createMaterialDtos) {
      const materialFound = await this.materialRepository.findOne({ where: { name: dto.name } });
      if (materialFound) {
        conflicts.push(dto.name);
      }
    }

    if (conflicts.length > 0) {
      throw new HttpException(`These materials already exist: ${conflicts.join(', ')}`,
        HttpStatus.CONFLICT
      );
    }

    try {
      const materials = createMaterialDtos.map(dto => this.materialRepository.create(dto));
      return this.materialRepository.save(materials);
    } catch (error) {
      throw new HttpException('Error in creating multiple material file information.', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async updateMaterial(id: number, updateMaterialDto: UpdateMaterialDto): Promise<Material> {
    if (updateMaterialDto.name) {
      const existingMaterial = await this.materialRepository.findOne({
        where: {
          name: updateMaterialDto.name,
          id: Not(Equal(id))
        }
      });

      if (existingMaterial) {
        throw new HttpException(`Another material with the name ${updateMaterialDto.name} already exists.`,
          HttpStatus.CONFLICT
        );
      }
    }
    try {
      const material = await this.materialRepository.preload({
        id: id,
        ...updateMaterialDto,
      });

      if (!material) {
        throw new HttpException('Material not found', HttpStatus.NOT_FOUND);
      }

      return this.materialRepository.save(material);
    } catch (error) {
      throw new HttpException('Error updating material', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async updateManyMaterials(updateManyMaterialsDto: UpdateManyMaterialsDto): Promise<Material[]> {
    const updatedMaterials: Material[] = [];
    const conflicts = [];

    await this.connection.transaction(async manager => {
      for (const updateMaterialDto of updateManyMaterialsDto.materials) {
        const existingMaterial = await manager.findOne(Material, {
          where: {
            name: updateMaterialDto.name,
            id: Not(updateMaterialDto.id)
          },
        });

        if (existingMaterial) {
          conflicts.push(updateMaterialDto.name);
        } else {
          try {
            const material = await manager.preload(Material, { id: updateMaterialDto.id });

            if (!material) {
              continue;
            }

            if (updateMaterialDto.name !== undefined) {
              material.name = updateMaterialDto.name;
            }

            const updatedMaterial = await manager.save(Material, material);
            updatedMaterials.push(updatedMaterial);

          } catch (error) {
            throw new HttpException(`Error updating material with ID ${updateMaterialDto.id}: ${error.message || 'Unknown error'}`,
              HttpStatus.INTERNAL_SERVER_ERROR
            );
          }
        }
      }

      if (conflicts.length > 0) {
        throw new HttpException(`Conflict: Another material with these names already exists: ${conflicts.join(', ')}`,
          HttpStatus.CONFLICT
        );
      }
    });

    return updatedMaterials;
  }

  async deleteMaterial(id: number): Promise<void> {
    const result = await this.materialRepository.delete(id);
    if (result.affected === 0) {
      throw new HttpException('Material not found', HttpStatus.NOT_FOUND);
    }
  }

  async deleteManyMaterials(deleteManyMaterialsDto: DeleteManyMaterialsDto): Promise<void> {
    const idsToDelete = deleteManyMaterialsDto.materials.map(material => material.id);

    const foundMaterials = await this.materialRepository.find({
      where: { id: In(idsToDelete) },
    });

    const foundIDs = foundMaterials.map(material => material.id);
    const notFoundIDs = idsToDelete.filter(id => !foundIDs.includes(id));

    if (notFoundIDs.length > 0) {
      throw new HttpException(`Materials with IDs ${notFoundIDs.join(', ')} not found`, HttpStatus.NOT_FOUND);
    }

    await this.materialRepository.delete(idsToDelete);
  }
}