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
exports.UpdateManyMaterialsDto = exports.UpdateMaterialDto = exports.UpdateOneMaterialDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_material_dto_1 = require("./create-material.dto");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const swagger_1 = require("@nestjs/swagger");
class UpdateOneMaterialDto extends (0, mapped_types_1.PartialType)(create_material_dto_1.CreateMaterialDto) {
}
exports.UpdateOneMaterialDto = UpdateOneMaterialDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The name of the material.',
        example: "monohulls",
        type: String,
    }),
    __metadata("design:type", String)
], UpdateOneMaterialDto.prototype, "name", void 0);
;
class UpdateMaterialDto extends (0, mapped_types_1.PartialType)(create_material_dto_1.CreateMaterialDto) {
}
exports.UpdateMaterialDto = UpdateMaterialDto;
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsPositive)(),
    (0, swagger_1.ApiProperty)({
        description: 'Id to pinpoint the material to update.',
        example: 12,
        type: Number,
    }),
    __metadata("design:type", Number)
], UpdateMaterialDto.prototype, "id", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({
        description: 'The name of the material.',
        example: "zinc",
        type: String,
    }),
    __metadata("design:type", String)
], UpdateMaterialDto.prototype, "name", void 0);
class UpdateManyMaterialsDto {
}
exports.UpdateManyMaterialsDto = UpdateManyMaterialsDto;
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => UpdateMaterialDto),
    (0, swagger_1.ApiProperty)({
        description: 'Array of material update objects.',
        type: [UpdateMaterialDto],
        example: [
            { id: 1, name: 'zinc' },
        ],
    }),
    __metadata("design:type", Array)
], UpdateManyMaterialsDto.prototype, "materials", void 0);
//# sourceMappingURL=update-material.dto.js.map