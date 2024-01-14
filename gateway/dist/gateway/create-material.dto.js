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
exports.CreateManyMaterialsDto = exports.CreateMaterialDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
class CreateMaterialDto {
}
exports.CreateMaterialDto = CreateMaterialDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({
        description: 'The name of the material.',
        example: 'zinc',
        type: String,
    }),
    __metadata("design:type", String)
], CreateMaterialDto.prototype, "name", void 0);
class CreateManyMaterialsDto {
}
exports.CreateManyMaterialsDto = CreateManyMaterialsDto;
__decorate([
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => CreateMaterialDto),
    (0, swagger_1.ApiProperty)({
        description: 'Collection of material objects.',
        type: [CreateMaterialDto],
        example: [
            { name: 'zinc' },
        ],
    }),
    __metadata("design:type", Array)
], CreateManyMaterialsDto.prototype, "materials", void 0);
//# sourceMappingURL=create-material.dto.js.map