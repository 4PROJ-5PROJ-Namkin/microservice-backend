"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContractsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const contract_entity_1 = require("./entities/contract.entity");
const axios_1 = require("@nestjs/axios");
const rxjs_1 = require("rxjs");
let ContractsService = class ContractsService {
    constructor(contractsRepository, httpService) {
        this.contractsRepository = contractsRepository;
        this.httpService = httpService;
    }
    async create(createContractInput) {
        const contractData = {
            contract_number: createContractInput.contract_number,
            client_name: createContractInput.client_name,
            date: createContractInput.date,
            cash: createContractInput.cash,
            parts: createContractInput.parts
        };
        return await this.contractsRepository.save(this.contractsRepository.create(contractData));
    }
    async findAllContracts() {
        return await this.contractsRepository.find();
    }
    async findOneById(contract_number) {
        const contract = await this.contractsRepository.findOneBy({ contract_number });
        if (!contract) {
            throw new common_1.HttpException({ message: 'Contract not found.' }, common_1.HttpStatus.NOT_FOUND);
        }
        return contract;
    }
    async exists(contract_number) {
        const contract = await this.contractsRepository.findOneBy({ contract_number });
        if (!contract) {
            return false;
        }
        return true;
    }
    async update(contract_number, updateContractInput) {
        const contract = await this.contractsRepository.findOneBy({ contract_number });
        if (!contract) {
            throw new common_1.HttpException({ message: 'Contract not found.' }, common_1.HttpStatus.NOT_FOUND);
        }
        else {
            await this.contractsRepository.update(contract_number, Object.assign({}, updateContractInput));
            return this.contractsRepository.findOneBy({ contract_number });
        }
    }
    async remove(contract_number) {
        const contract = await this.contractsRepository.findOneBy({ contract_number });
        if (!contract) {
            throw new common_1.HttpException({ message: 'Contract not found.' }, common_1.HttpStatus.NOT_FOUND);
        }
        else {
            await this.contractsRepository.delete({ contract_number });
        }
    }
    async checkIfPieceExists(parts) {
        await Promise.all(parts.map(async (partId) => {
            try {
                const response = await (0, rxjs_1.lastValueFrom)(this.httpService.get(`http://localhost:3002/api/v1/part-information/${partId}`));
            }
            catch (error) {
                if (error.response) {
                    if (error.response.status === 404) {
                        throw new common_1.HttpException({ message: `Part with ID ${partId} not found.` }, common_1.HttpStatus.NOT_FOUND);
                    }
                }
                else {
                    throw error;
                }
            }
        }));
    }
};
ContractsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(contract_entity_1.Contract)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        axios_1.HttpService])
], ContractsService);
exports.ContractsService = ContractsService;
//# sourceMappingURL=contract.service.js.map