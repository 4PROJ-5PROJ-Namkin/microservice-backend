import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Contract } from './entities/contract.entity';
import { CreateContractInput } from './dto/create-contract.input';
import { UpdateContractsInput } from './dto/update-contract.input';

@Injectable()
export class ContractsService {
  constructor(
    @InjectRepository(Contract)
    private contractsRepository: Repository<Contract>,
  ) {}

  async create(createContractInput: CreateContractInput): Promise<Contract> {
    const contractData = {
      contract_number: createContractInput.contract_number,
      client_name: createContractInput.client_name,
      date: createContractInput.date,
      cash : createContractInput.cash,
      parts : createContractInput.parts
    };
    return await this.contractsRepository.save(this.contractsRepository.create(contractData));
  }

  async findAllContracts(): Promise<Contract[]> {
    return await this.contractsRepository.find();
  }

  async findOneById(id: string): Promise<Contract> {
    const contract = await this.contractsRepository.findOneBy({ id });
    if (!contract) {
      throw new HttpException({ message: 'Contract not found.' }, HttpStatus.NOT_FOUND);
    }
    return contract;
  }

  async update(id: string, updateContractInput: UpdateContractsInput): Promise<Contract> {
    const contract = await this.contractsRepository.findOneBy({ id });
    if (!contract) {
      throw new HttpException({ message: 'Contract not found.' }, HttpStatus.NOT_FOUND);
    } else {
      await this.contractsRepository.update(id, { ...updateContractInput });
      return this.contractsRepository.findOneBy({ id });
    }
  }

  async remove(id: string): Promise<void> {
    const contract = await this.contractsRepository.findOneBy({ id });
    if (!contract) {
      throw new HttpException({ message: 'Contract not found.' }, HttpStatus.NOT_FOUND);
    } else {
      await this.contractsRepository.delete({ id });
    }
  }
}
