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
exports.AppController = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("@nestjs/axios");
const operators_1 = require("rxjs/operators");
const auth_dto_1 = require("./gateway/auth.dto");
const swagger_1 = require("@nestjs/swagger");
const update_users_dto_1 = require("./gateway/update-users.dto");
const update_material_dto_1 = require("./gateway/update-material.dto");
const create_material_dto_1 = require("./gateway/create-material.dto");
let AppController = exports.AppController = class AppController {
    constructor(httpService) {
        this.httpService = httpService;
    }
    getAllUsers(authHeader) {
        return this.httpService.get('http://users-services-backend:3001/api/v1/users', {
            headers: { 'Authorization': authHeader },
        }).pipe((0, operators_1.map)(response => response.data), (0, operators_1.catchError)(err => {
            if (err.response) {
                throw new common_1.HttpException(err.response.data, err.response.status);
            }
            else {
                throw new common_1.HttpException('Erreur de connexion au service', common_1.HttpStatus.SERVICE_UNAVAILABLE);
            }
        }));
    }
    getUserById(authHeader, id) {
        return this.httpService.get(`http://users-services-backend:3001/api/v1/users/${id}`, {
            headers: { 'Authorization': authHeader },
        }).pipe((0, operators_1.map)(response => response.data), (0, operators_1.catchError)(err => {
            throw new common_1.HttpException(err.response.data, err.response.status);
        }));
    }
    updateUserById(userData, authHeader, id) {
        return this.httpService.patch(`http://users-services-backend:3001/api/v1/users/${id}`, userData, {
            headers: { 'Authorization': authHeader },
        }).pipe((0, operators_1.map)(response => response.data), (0, operators_1.catchError)(err => {
            throw new common_1.HttpException(err.response.data, err.response.status);
        }));
    }
    deleteUserById(authHeader, id) {
        return this.httpService.delete(`http://users-services-backend:3001/api/v1/users/${id}`, {
            headers: { 'Authorization': authHeader },
        }).pipe((0, operators_1.map)(response => response.data), (0, operators_1.catchError)(err => {
            throw new common_1.HttpException(err.response.data, err.response.status);
        }));
    }
    login(loginData) {
        return this.httpService.post('http://users-services-backend:3001/api/v1/login', loginData)
            .pipe((0, operators_1.map)(response => response.data), (0, operators_1.catchError)(err => {
            throw new common_1.HttpException(err.response.data, err.response.status);
        }));
    }
    createUser(userData) {
        return this.httpService.post('http://users-services-backend:3001/api/v1/register', userData)
            .pipe((0, operators_1.map)(response => response.data), (0, operators_1.catchError)(err => {
            throw new common_1.HttpException(err.response.data, err.response.status);
        }));
    }
    getAllMaterials() {
        return this.httpService.get('http://production-service-backend:3002/api/v1/materials').pipe((0, operators_1.map)(response => response.data), (0, operators_1.catchError)(err => {
            throw new common_1.HttpException(err.response.data, err.response.status);
        }));
    }
    getMaterialById(authHeader, id) {
        return this.httpService.get(`http://production-service-backend:3002/api/v1/materials/${id}`, {
            headers: { 'Authorization': authHeader },
        }).pipe((0, operators_1.map)(response => response.data), (0, operators_1.catchError)(err => {
            throw new common_1.HttpException(err.response.data, err.response.status);
        }));
    }
    updateMaterialById(materialData) {
        return this.httpService.patch(`http://production-service-backend:3002/api/v1/materials/`, materialData).pipe((0, operators_1.map)(response => response.data), (0, operators_1.catchError)(err => {
            throw new common_1.HttpException(err.response.data, err.response.status);
        }));
    }
    createMaterial(materialData) {
        return this.httpService.post('http://production-service-backend:3002/api/v1/materials/', materialData)
            .pipe((0, operators_1.map)(response => response.data), (0, operators_1.catchError)(err => {
            throw new common_1.HttpException(err.response.data, err.response.status);
        }));
    }
};
__decorate([
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, common_1.Get)('gateway/users'),
    (0, swagger_1.ApiOperation)({ summary: 'Find all user' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Token is expired or invalid' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden resource' }),
    (0, swagger_1.ApiResponse)({ status: 500, description: 'Error finding users' }),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ transform: true })),
    __param(0, (0, common_1.Headers)('authorization')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "getAllUsers", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, common_1.Get)('gateway/users/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Find one user' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'unauthorized' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden resource' }),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ transform: true })),
    __param(0, (0, common_1.Headers)('authorization')),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "getUserById", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, common_1.Patch)('gateway/users/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update password' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'password updated', }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'User not found.' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden' }),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ transform: true })),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Headers)('authorization')),
    __param(2, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_users_dto_1.UpdateUsersDto, Object, String]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "updateUserById", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, common_1.Delete)('gateway/users/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'delete one user' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden' }),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ transform: true })),
    __param(0, (0, common_1.Headers)('authorization')),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "deleteUserById", null);
__decorate([
    (0, common_1.Post)('login'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ transform: true })),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'User not found' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Error during token generation' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Wrong password' }),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ transform: true })),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_dto_1.LoginUserDto]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "login", null);
__decorate([
    (0, common_1.Post)('register'),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'User may already exist' }),
    (0, swagger_1.ApiResponse)({ status: 500, description: 'Error creating user' }),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ transform: true })),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_dto_1.RegisterUserDto]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "createUser", null);
__decorate([
    (0, common_1.Get)('gateway/materials'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AppController.prototype, "getAllMaterials", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, common_1.Get)('gateway/material/:id'),
    __param(0, (0, common_1.Headers)('authorization')),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "getMaterialById", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, common_1.Patch)('gateway/material/:id'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_material_dto_1.UpdateMaterialDto]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "updateMaterialById", null);
__decorate([
    (0, common_1.Post)('gateway/materials/create'),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.CREATED, description: 'Material created' }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.CONFLICT, description: 'Material already exists' }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.INTERNAL_SERVER_ERROR, description: 'Error in creating material' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_material_dto_1.CreateMaterialDto]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "createMaterial", null);
exports.AppController = AppController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [axios_1.HttpService])
], AppController);
//# sourceMappingURL=app.controller.js.map