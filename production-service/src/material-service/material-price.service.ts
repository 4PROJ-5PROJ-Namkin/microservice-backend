import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MaterialPrice } from './entities/material-price.entity';
import { CreateManyMaterialPricesDto, CreateMaterialPriceDto } from './dto/material-price-service-dto/create-material-price.dto';
import { Material } from './entities/material.entity';
import { DeleteManyMaterialPricesDto, DeleteMaterialPriceDto } from './dto/material-price-service-dto/delete-material-price.dto';

@Injectable()
export class MaterialPriceService {
    constructor(
        @InjectRepository(MaterialPrice)
        private materialPriceRepository: Repository<MaterialPrice>,
        @InjectRepository(Material)
        private materialRepository: Repository<Material>,
    ) { }

    async findMaterialPrices(materialId: number): Promise<MaterialPrice[]> {
        const material = await this.materialRepository.findOne({ where: { id: materialId } });
        if (!material) {
            throw new NotFoundException(`Material with ID ${materialId} not found`);
        }

        return this.materialPriceRepository.find({ where: { material: { id: materialId } } });
    }

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

    async updateOrCreateManyMaterialPrices(materialId: number, createManyMaterialPricesDto: CreateManyMaterialPricesDto): Promise<MaterialPrice[]> {
        const material = await this.materialRepository.findOne({ where: { id: materialId } });
        if (!material) {
            throw new NotFoundException(`Material with ID ${materialId} not found`);
        }

        const materialPricesToPush: MaterialPrice[] = [];

        for (const createMaterialPriceDto of createManyMaterialPricesDto.prices) {
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

            materialPricesToPush.push(await this.materialPriceRepository.save(materialPrice));
        }

        return materialPricesToPush;
    }

    async deleteMaterialPrice(materialId: number, deleteMaterialPriceDto: DeleteMaterialPriceDto): Promise<void> {
        const materialPrice = await this.materialPriceRepository.findOne({
            where: {
                material: { id: materialId },
                price: deleteMaterialPriceDto.price,
                date: deleteMaterialPriceDto.date
            }
        });

        if (materialPrice) {
            const deleteResult = await this.materialPriceRepository.delete(materialPrice.id);

            if (deleteResult.affected === 0) {
                throw new HttpException('Material price not found', HttpStatus.NOT_FOUND);
            }
        } else {
            throw new NotFoundException(`Material Price for ID ${materialId} with the specified price or date doesn't exist.`);
        }
    }

    async deleteManyMaterialPrices(materialId: number, deleteManyMaterialPricesDto: DeleteManyMaterialPricesDto): Promise<void> {
        await this.materialPriceRepository.manager.transaction(async entityManager => {
            for (const deleteDto of deleteManyMaterialPricesDto.prices) {
                const materialPrice = await entityManager.findOne(MaterialPrice, {
                    where: {
                        material: { id: materialId },
                        price: deleteDto.price,
                        date: deleteDto.date
                    }
                });

                if (materialPrice) {
                    const deleteResult = await entityManager.delete(MaterialPrice, materialPrice.id);
                    if (deleteResult.affected === 0) {
                        throw new HttpException('Material price not found', HttpStatus.NOT_FOUND);
                    }
                } else {
                    throw new NotFoundException(`Material Price for ID ${materialId} with the specified price or date doesn't exist.`);
                }
            }
        });
    }
}