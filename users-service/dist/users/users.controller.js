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
exports.UsersController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const microservices_1 = require("@nestjs/microservices");
const users_service_1 = require("./users.service");
let UsersController = class UsersController {
    constructor(usersService) {
        this.usersService = usersService;
    }
    async findAllUser() {
        return this.usersService.findAllUsers();
    }
    async GetUser() {
        return this.usersService.findAllUsers();
    }
};
__decorate([
    (0, common_1.Get)('users'),
    (0, swagger_1.ApiOperation)({ summary: 'Find all user' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Token is expired or invalid' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden resource' }),
    (0, swagger_1.ApiResponse)({ status: 500, description: 'Error finding users' }),
    (0, microservices_1.GrpcMethod)('UserService', 'getUsers'),
    openapi.ApiResponse({ status: 200, type: [require("./entities/users.entity").Users] }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "findAllUser", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Find all user' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Token is expired or invalid' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden resource' }),
    (0, swagger_1.ApiResponse)({ status: 500, description: 'Error finding users' }),
    (0, microservices_1.GrpcMethod)('UserService', 'getUsers'),
    openapi.ApiResponse({ status: 200, type: [require("./entities/users.entity").Users] }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "GetUser", null);
UsersController = __decorate([
    (0, swagger_1.ApiTags)('Users'),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, common_1.Controller)('users'),
    __metadata("design:paramtypes", [users_service_1.UserService])
], UsersController);
exports.UsersController = UsersController;
//# sourceMappingURL=users.controller.js.map