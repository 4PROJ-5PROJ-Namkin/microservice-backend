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
exports.ContractsController = void 0;
const contract_service_1 = require("./contract.service");
const create_contract_input_1 = require("./dto/create-contract.input");
const update_contract_input_1 = require("./dto/update-contract.input");
const common_1 = require("@nestjs/common");
let ContractsController = class ContractsController {
    constructor(contractsService) {
        this.contractsService = contractsService;
    }
    async create(createContractInput) {
        const existingContract = await this.contractsService.exists(createContractInput.contract_number);
        await this.contractsService.checkIfPieceExists(createContractInput.parts);
        if (existingContract) {
            throw new common_1.BadRequestException('Contract number already exists');
        }
        return this.contractsService.create(createContractInput);
    }
    async findAll() {
        return this.contractsService.findAllContracts();
    }
    findOne(id) {
        return this.contractsService.findOneById(id);
    }
    async update(updateContractsInput, contract_number) {
        await this.contractsService.checkIfPieceExists(updateContractsInput.parts);
        return this.contractsService.update(contract_number, updateContractsInput);
    }
    remove(contract_number) {
        return this.contractsService.remove(contract_number);
    }
};
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ transform: true, whitelist: true, exceptionFactory: (errors) => new common_1.BadRequestException(errors) })),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_contract_input_1.CreateContractInput]),
    __metadata("design:returntype", Promise)
], ContractsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ContractsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':contract_number'),
    __param(0, (0, common_1.Param)('contract_number')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ContractsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':contract_number'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ transform: true, whitelist: true, exceptionFactory: (errors) => new common_1.BadRequestException(errors) })),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)('contract_number')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_contract_input_1.UpdateContractsInput, String]),
    __metadata("design:returntype", Promise)
], ContractsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':contract_number'),
    __param(0, (0, common_1.Param)('contract_number')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ContractsController.prototype, "remove", null);
ContractsController = __decorate([
    (0, common_1.Controller)('contracts'),
    __metadata("design:paramtypes", [contract_service_1.ContractsService])
], ContractsController);
exports.ContractsController = ContractsController;
//# sourceMappingURL=contract.controller.js.map