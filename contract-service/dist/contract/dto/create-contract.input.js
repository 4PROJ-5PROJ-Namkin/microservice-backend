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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateContractInput = void 0;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const swagger_1 = require("@nestjs/swagger");
class CreateContractInput {
    constructor(contract_number, client_name, date, cash, parts) {
        this.contract_number = contract_number;
        this.client_name = client_name;
        this.date = date;
        this.cash = cash;
        this.parts = parts;
    }
}
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Contract number should not be empty' }),
    (0, class_validator_1.Length)(3, 100, { message: 'Contract number must be between 3 and 100 characters long' }),
    (0, swagger_1.ApiProperty)({ example: '2024-01-09A', description: 'Unique contract id' }),
    __metadata("design:type", String)
], CreateContractInput.prototype, "contract_number", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Eischen', description: 'Client Name' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Client name should not be empty' }),
    __metadata("design:type", String)
], CreateContractInput.prototype, "client_name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2024-01-28', description: 'Date' }),
    (0, class_validator_1.IsDate)({ message: 'Date is not valid' }),
    (0, class_transformer_1.Type)(() => Date),
    __metadata("design:type", Date)
], CreateContractInput.prototype, "date", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '[99, 25.99 , 4]', description: 'array of Prices ID' }),
    (0, class_validator_1.IsArray)({ message: 'Cash should be an array' }),
    __metadata("design:type", Array)
], CreateContractInput.prototype, "cash", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '[1, 3, 4]', description: 'array of Parts ID' }),
    (0, class_validator_1.IsArray)({ message: 'Parts should be an array' }),
    __metadata("design:type", Array)
], CreateContractInput.prototype, "parts", void 0);
exports.CreateContractInput = CreateContractInput;
//# sourceMappingURL=create-contract.input.js.map