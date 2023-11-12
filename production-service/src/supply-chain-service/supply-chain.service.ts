import { InjectRepository } from "@nestjs/typeorm";
import { SupplyChain } from "./entities/supply-chain.entity";
import { ConflictException, HttpException, HttpStatus, Injectable, NotFoundException } from "@nestjs/common";
import { Repository } from "typeorm";
import { PartInformation } from "src/part-information-service/entities/part-information.entity";
import { Machine } from "./entities/machine.entity";
import { CreateSupplyChainDto } from "./dto/create-supply-chain.dto";

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

  async createSupplyChain(createSupplyChainDto: CreateSupplyChainDto): Promise<SupplyChain> {
    for (const machineId of createSupplyChainDto.machineIds) {
      const existingMachine = await this.machineRepository.findOne({ where: { id: machineId } });
      if (!existingMachine) {
        throw new NotFoundException(`Machine with ID ${machineId} not found.`);
      }
    }

    for (const partId of createSupplyChainDto.partIds) {
      const existingPart = await this.partInformationRepository.findOne({ where: { id: partId } });
      if (!existingPart) {
        throw new NotFoundException(`PartInformation with ID ${partId} not found.`);
      }
    }

    try {
      const supplyChain = this.supplyChainRepository.create({
        ...createSupplyChainDto,
        machine: createSupplyChainDto.machineIds.map(id => ({ id })),
        part: createSupplyChainDto.partIds.map(id => ({ id }))
      });

      return this.supplyChainRepository.save(supplyChain);
    } catch (error) {
      throw new HttpException('Error in creating a supply chain file.', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
