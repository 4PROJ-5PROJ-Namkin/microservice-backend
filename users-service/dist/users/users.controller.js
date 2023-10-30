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
exports.UsersController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const params_user_dto_1 = require("./dto/params-user.dto");
const update_users_dto_1 = require("./dto/update-users.dto");
const users_service_1 = require("./users.service");
const users_entity_1 = require("./entities/users.entity");
const swagger_1 = require("@nestjs/swagger");
const auth_decorator_1 = require("../auth/guards/auth.decorator");
const auth_enum_1 = require("../auth/guards/auth.enum");
let UsersController = class UsersController {
    constructor(usersService) {
        this.usersService = usersService;
    }
    async findAllUser(headers) {
        return this.usersService.findAllUsers(headers);
    }
    async findOneById(id) {
        return this.usersService.findById(id.id, common_1.Headers);
    }
    async updatePassword(id, updateUsersDto) {
        return this.usersService.updatePassword(id.id, updateUsersDto);
    }
    async remove(id) {
        return this.usersService.remove(id.id);
    }
};
__decorate([
    (0, common_1.Get)(),
    (0, auth_decorator_1.Roles)(auth_enum_1.Role.ADMIN),
    (0, swagger_1.ApiOperation)({ summary: 'Find all user' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Token is expired or invalid' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden resource' }),
    (0, swagger_1.ApiResponse)({ status: 500, description: 'Error finding users' }),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ transform: true })),
    openapi.ApiResponse({ status: 200, type: [require("./entities/users.entity").Users] }),
    __param(0, (0, common_1.Headers)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "findAllUser", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, auth_decorator_1.Roles)(auth_enum_1.Role.ADMIN),
    (0, swagger_1.ApiOperation)({ summary: 'Find one user' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'unauthorized' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden resource' }),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ transform: true })),
    openapi.ApiResponse({ status: 200, type: require("./entities/users.entity").Users }),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [params_user_dto_1.UUID]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "findOneById", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, auth_decorator_1.Roles)(auth_enum_1.Role.ADMIN, auth_enum_1.Role.COMMERCIAL),
    (0, swagger_1.ApiOperation)({ summary: 'Update password' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'password updated', type: users_entity_1.default }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'User not found.' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden' }),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ transform: true })),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [params_user_dto_1.UUID, update_users_dto_1.UpdateUsersDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "updatePassword", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, auth_decorator_1.Roles)(auth_enum_1.Role.ADMIN),
    (0, swagger_1.ApiOperation)({ summary: 'delete one user' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden' }),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ transform: true })),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [params_user_dto_1.UUID]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "remove", null);
UsersController = __decorate([
    (0, common_1.Controller)('users'),
    __metadata("design:paramtypes", [users_service_1.UsersService])
], UsersController);
exports.UsersController = UsersController;
//# sourceMappingURL=users.controller.js.map