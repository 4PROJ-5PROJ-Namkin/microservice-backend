import { Repository } from 'typeorm';
import { Contract } from './entities/contract.entity';
import { CreateContractInput } from './dto/create-contract.input';
import { UpdateContractsInput } from './dto/update-contract.input';
import { HttpService } from '@nestjs/axios';
export declare class ContractsService {
    private contractsRepository;
    private readonly httpService;
    constructor(contractsRepository: Repository<Contract>, httpService: HttpService);
    create(createContractInput: CreateContractInput): Promise<Contract>;
    findAllContracts(): Promise<Contract[]>;
    findOneById(contract_number: string): Promise<Contract>;
    exists(contract_number: string): Promise<Boolean>;
    update(contract_number: string, updateContractInput: UpdateContractsInput): Promise<Contract>;
    remove(contract_number: string): Promise<void>;
    checkIfPieceExists(parts: number[]): Promise<void>;
}
