import { InjectRepository } from "@nestjs/typeorm";
import { SupplyChain } from "./entities/supply-chain.entity";
import { HttpException, HttpStatus, Injectable, NotFoundException } from "@nestjs/common";
import { Repository } from "typeorm";
import { PartInformation } from "src/part-information-service/entities/part-information.entity";
import { Machine } from "./entities/machine.entity";
import { CreateManySupplyChainDto, CreateSupplyChainDto } from "./dto/create-supply-chain.dto";
import { UpdateManySupplyChainDto, UpdateOneSupplyChainDto } from "./dto/update-supply-chain.dto";

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
    const machine = await this.machineRepository.findOne({ where: { id: createSupplyChainDto.machineId } });
    if (!machine) {
      throw new NotFoundException('Machine ID not found.');
    }

    const part = await this.partInformationRepository.findOne({ where: { id: createSupplyChainDto.partId } });
    if (!part) {
      throw new NotFoundException('PartInformation ID not found.');
    }

    try {
      const newSupplyChain = this.supplyChainRepository.create({
        ...createSupplyChainDto,
        machine,
        part
      });
      return this.supplyChainRepository.save(newSupplyChain);
    } catch (error) {
      throw new HttpException('Error in creating a supply chain file.', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async createManySupplyChains(createManySupplyChainDto: CreateManySupplyChainDto): Promise<SupplyChain[]> {
    const createdSupplyChains: SupplyChain[] = [];

    for (const createSupplyChainDto of createManySupplyChainDto.supplyChains) {
      const machine = await this.machineRepository.findOne({ where: { id: createSupplyChainDto.machineId } });
      if (!machine) {
        throw new NotFoundException('Machine ID not found.');
      }

      const part = await this.partInformationRepository.findOne({ where: { id: createSupplyChainDto.partId } });
      if (!part) {
        throw new NotFoundException('PartInformation ID not found.');
      }
      try {
        const newSupplyChain = this.supplyChainRepository.create({
          ...createSupplyChainDto,
          machine,
          part
        });

        const savedSupplyChain = await this.supplyChainRepository.save(newSupplyChain);
        createdSupplyChains.push(savedSupplyChain);

      } catch (error) {
        throw new HttpException('Error in creating a supply chain file.', HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
    return createdSupplyChains;
  }

  async updateOneSupplyChain(id: string, updateSupplyChainDto: UpdateOneSupplyChainDto): Promise<SupplyChain> {
    const supplyChainToUpdate = await this.supplyChainRepository.findOne({ where: { id }, relations: ['machine', 'part'] });
    if (!supplyChainToUpdate) {
      throw new NotFoundException(`SupplyChain with ID ${id} not found.`);
    }

    const machine = await this.machineRepository.findOne({ where: { id: updateSupplyChainDto.machineId } });
    if (!machine && updateSupplyChainDto.machineId !== undefined) {
      throw new NotFoundException('Machine ID not found.');
    }

    const part = await this.partInformationRepository.findOne({ where: { id: updateSupplyChainDto.partId } });
    if (!part && updateSupplyChainDto.partId !== undefined) {
      throw new NotFoundException('PartInformation ID not found.');
    }

    Object.assign(supplyChainToUpdate, updateSupplyChainDto);
    if (machine) {
      supplyChainToUpdate.machine = machine;
    }
    if (part) {
      supplyChainToUpdate.part = part;
    }

    return this.supplyChainRepository.save(supplyChainToUpdate);
  }

  async updateManySupplyChains(updateManySupplyChainDto: UpdateManySupplyChainDto): Promise<SupplyChain[]> {
    const updatedSupplyChains: SupplyChain[] = [];

    for (const updateDto of updateManySupplyChainDto.supplyChains) {
      const updatedSupplyChain = await this.updateOneSupplyChain(updateDto.id, updateDto);
      updatedSupplyChains.push(updatedSupplyChain);
    }
    return updatedSupplyChains;
  }
}
