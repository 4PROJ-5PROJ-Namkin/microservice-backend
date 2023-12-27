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
exports.CreateUsersDto = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CreateUsersDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { first_name: { required: true, type: () => String, minLength: 2, maxLength: 25 }, last_name: { required: true, type: () => String, minLength: 2, maxLength: 25 }, email: { required: true, type: () => String }, telephoneNumber: { required: true, type: () => String }, password: { required: true, type: () => String } };
    }
}
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(2, 25),
    (0, swagger_1.ApiProperty)({
        description: 'First name',
        example: "Rudy",
        type: String
    }),
    __metadata("design:type", String)
], CreateUsersDto.prototype, "first_name", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(2, 25),
    (0, swagger_1.ApiProperty)({
        description: 'Last name',
        example: "turpin",
        type: String
    }),
    __metadata("design:type", String)
], CreateUsersDto.prototype, "last_name", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsEmail)(),
    (0, swagger_1.ApiProperty)({
        description: 'email',
        example: "rudy.turpin@supinfo.com",
        type: String
    }),
    __metadata("design:type", String)
], CreateUsersDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsPhoneNumber)(),
    (0, swagger_1.ApiProperty)({
        description: 'email',
        example: "rudy.turpin@supinfo.com",
        type: String
    }),
    __metadata("design:type", String)
], CreateUsersDto.prototype, "telephoneNumber", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsStrongPassword)({ minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1 }),
    (0, swagger_1.ApiProperty)({
        description: 'password',
        example: "ajfr51!fjbe",
        type: String
    }),
    __metadata("design:type", String)
], CreateUsersDto.prototype, "password", void 0);
exports.CreateUsersDto = CreateUsersDto;
//# sourceMappingURL=create-users.dto.js.map