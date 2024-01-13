import { ContractsService } from './contract.service';
import { CreateContractInput } from './dto/create-contract.input';
import { UpdateContractsInput } from './dto/update-contract.input';
export declare class ContractsController {
    private readonly contractsService;
    constructor(contractsService: ContractsService);
    create(createContractInput: CreateContractInput): Promise<import("./entities/contract.entity").Contract>;
    findAll(): Promise<import("./entities/contract.entity").Contract[]>;
    findOne(id: string): Promise<import("./entities/contract.entity").Contract>;
    update(updateContractsInput: UpdateContractsInput, contract_number: string): Promise<import("./entities/contract.entity").Contract>;
    remove(contract_number: string): Promise<void>;
}
