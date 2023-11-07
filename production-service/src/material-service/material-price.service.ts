import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MaterialPrice } from './entities/material-price.entity';
import { CreateManyMaterialPricesDto, CreateMaterialPriceDto } from './dto/material-price-service-dto/create-material-price.dto';
import { Material } from './entities/material.entity';

@Injectable()
export class MaterialPriceService {
    constructor(
        @InjectRepository(MaterialPrice)
        private materialPriceRepository: Repository<MaterialPrice>,
        @InjectRepository(Material)
        private materialRepository: Repository<Material>,
    ) { }

    async updateOrCreateMaterialPrice(materialId: number, createMaterialPriceDto: CreateMaterialPriceDto): Promise<MaterialPrice> {
        const material = await this.materialRepository.findOne({ where: { id: materialId } });
        if (!material) {
            throw new NotFoundException(`Material with ID ${materialId} not found`);
        }

        let materialPrice = await this.materialPriceRepository.findOne({
            where: {
                material: { id: materialId },
                date: createMaterialPriceDto.date
            }
        });

        if (materialPrice) {
            materialPrice.price = createMaterialPriceDto.price;
            materialPrice.date = createMaterialPriceDto.date;
        } else {
            materialPrice = this.materialPriceRepository.create({
                ...createMaterialPriceDto,
                material: { id: materialId }
            });
        }

        return this.materialPriceRepository.save(materialPrice);
    }
}