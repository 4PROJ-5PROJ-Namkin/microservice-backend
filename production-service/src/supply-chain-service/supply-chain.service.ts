import { InjectRepository } from "@nestjs/typeorm";
import { SupplyChain } from "./entities/supply-chain.entity";
import { HttpException, HttpStatus, Injectable, NotFoundException } from "@nestjs/common";
import { Connection, In, Repository } from "typeorm";
import { PartInformation } from "src/part-information-service/entities/part-information.entity";
import { Machine } from "./entities/machine.entity";
import { CreateManySupplyChainDto, CreateSupplyChainDto } from "./dto/create-supply-chain.dto";
import { UpdateManySupplyChainDto, UpdateSupplyChainDto } from "./dto/update-supply-chain.dto";

@Injectable()
export class SupplyChainService {
  constructor(
    @InjectRepository(SupplyChain)
    private supplyChainRepository: Repository<SupplyChain>,
    @InjectRepository(Machine)
    private machineRepository: Repository<Machine>,
    @InjectRepository(PartInformation)
    private partInformationRepository: Repository<PartInformation>,
  ) { }

  async findOneSupplyChain(id: string): Promise<SupplyChain> {
    const supplyChain = await this.supplyChainRepository.findOne({ where: { id } });
    if (!supplyChain) {
      throw new NotFoundException(`SupplyChain with ID ${id} not found.`);
    }
    return supplyChain;
  }

  async findAllSupplyChains(): Promise<SupplyChain[]> {
    return this.supplyChainRepository.find();
  }

  async createSupplyChain(createSupplyChainDto: CreateSupplyChainDto): Promise<SupplyChain> {
    const machines = await this.machineRepository.findByIds(createSupplyChainDto.machineIds);
    if (machines.length !== createSupplyChainDto.machineIds.length) {
      throw new NotFoundException('One or more Machine IDs not found.');
    }

    const parts = await this.partInformationRepository.findByIds(createSupplyChainDto.partIds);
    if (parts.length !== createSupplyChainDto.partIds.length) {
      throw new NotFoundException('One or more PartInformation IDs not found.');
    }

    const newSupplyChain = this.supplyChainRepository.create(createSupplyChainDto);

    let savedSupplyChain;
    try {
      savedSupplyChain = await this.supplyChainRepository.save(newSupplyChain);
    } catch (error) {
      throw new HttpException('Error in creating a supply chain file.', HttpStatus.INTERNAL_SERVER_ERROR);
    }

    try {
      await Promise.all(createSupplyChainDto.machineIds.map(machineId =>
        this.machineRepository.createQueryBuilder()
          .relation(Machine, 'supplyChain')
          .of(machineId)
          .add(savedSupplyChain)
      ));

      await Promise.all(createSupplyChainDto.partIds.map(partId =>
        this.partInformationRepository.createQueryBuilder()
          .relation(PartInformation, 'supplyChain')
          .of(partId)
          .add(savedSupplyChain)
      ));

      return savedSupplyChain;
    } catch (error) {
      throw new HttpException('Error in associating machines and parts with the supply chain.', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async createManySupplyChains(createManySupplyChainDto: CreateManySupplyChainDto): Promise<SupplyChain[]> {
    const createdSupplyChains: SupplyChain[] = [];

    for (const createSupplyChainDto of createManySupplyChainDto.supplyChains) {
      const machines = await this.machineRepository.findByIds(createSupplyChainDto.machineIds);
      if (machines.length !== createSupplyChainDto.machineIds.length) {
        throw new NotFoundException('One or more Machine IDs not found.');
      }

      const parts = await this.partInformationRepository.findByIds(createSupplyChainDto.partIds);
      if (parts.length !== createSupplyChainDto.partIds.length) {
        throw new NotFoundException('One or more PartInformation IDs not found.');
      }

      const newSupplyChain = this.supplyChainRepository.create(createSupplyChainDto);

      try {
        const savedSupplyChain = await this.supplyChainRepository.save(newSupplyChain);

        await Promise.all(createSupplyChainDto.machineIds.map(machineId =>
          this.machineRepository.createQueryBuilder()
            .relation(Machine, 'supplyChain')
            .of(machineId)
            .add(savedSupplyChain)
        ));

        await Promise.all(createSupplyChainDto.partIds.map(partId =>
          this.partInformationRepository.createQueryBuilder()
            .relation(PartInformation, 'supplyChain')
            .of(partId)
            .add(savedSupplyChain)
        ));

        createdSupplyChains.push(savedSupplyChain);
      } catch (error) {
        throw new HttpException('Error in creating a supply chain file.', HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }

    return createdSupplyChains;
  }

  async updateOneSupplyChain(updateSupplyChainDto: UpdateSupplyChainDto): Promise<SupplyChain> {
    const { id, machineIds, partIds, ...updateData } = updateSupplyChainDto;

    const supplyChainToUpdate = await this.supplyChainRepository.findOne({ where: { id } });
    if (!supplyChainToUpdate) {
      throw new NotFoundException(`SupplyChain with ID ${id} not found.`);
    }

    let isUpdateNeeded = false;

    for (const key in updateData) {
      if (supplyChainToUpdate[key] !== updateData[key]) {
        isUpdateNeeded = true;
        supplyChainToUpdate[key] = updateData[key];
      }
    }

    if (isUpdateNeeded) {
      await this.supplyChainRepository.save(supplyChainToUpdate);
    }

    return this.supplyChainRepository.findOne({ where: { id }, relations: ['machine', 'part'] });
  }

  async updateManySupplyChains(updateManySupplyChainDto: UpdateManySupplyChainDto): Promise<SupplyChain[]> {
    const updatedSupplyChains: SupplyChain[] = [];

    for (const updateDto of updateManySupplyChainDto.supplyChains) {
      const supplyChain = await this.supplyChainRepository.findOne({ where: { id: updateDto.id } });
      if (!supplyChain) {
        throw new NotFoundException(`SupplyChain with ID ${updateDto.id} not found.`);
      }
      if (updateDto.machineIds) {
        const foundMachines = await this.machineRepository.findByIds(updateDto.machineIds);
        if (foundMachines.length !== updateDto.machineIds.length) {
          throw new NotFoundException('One or more Machine IDs not found.');
        }
      }

      if (updateDto.partIds) {
        const foundParts = await this.partInformationRepository.findByIds(updateDto.partIds);
        if (foundParts.length !== updateDto.partIds.length) {
          throw new NotFoundException('One or more PartInformation IDs not found.');
        }
      }

      Object.assign(supplyChain, updateDto);

      const updatedSupplyChain = await this.supplyChainRepository.save(supplyChain);
      updatedSupplyChains.push(updatedSupplyChain);
    }

    return updatedSupplyChains;
  }

}
