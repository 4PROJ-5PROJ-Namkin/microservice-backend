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
let AppController = exports.AppController = class AppController {
    constructor(httpService) {
        this.httpService = httpService;
    }
    getAllUsers(authHeader) {
        return this.httpService.get('http://localhost:3001/api/v1/users', {
            headers: { 'Authorization': authHeader },
        }).pipe((0, operators_1.map)(response => response.data));
    }
    getUserById(authHeader, id) {
        return this.httpService.get(`http://localhost:3001/api/v1/users/${id}`, {
            headers: { 'Authorization': authHeader },
        }).pipe((0, operators_1.map)(response => response.data));
    }
    updateUserById(userData, authHeader, id) {
        return this.httpService.patch(`http://localhost:3001/api/v1/users/${id}`, userData, {
            headers: { 'Authorization': authHeader },
        }).pipe((0, operators_1.map)(response => response.data));
    }
    deleteUserById(authHeader, id) {
        return this.httpService.delete(`http://localhost:3001/api/v1/users/${id}`, {
            headers: { 'Authorization': authHeader },
        }).pipe((0, operators_1.map)(response => response.data));
    }
    createUser(userData) {
        return this.httpService.post('http://localhost:3001/api/v1/register', userData)
            .pipe((0, operators_1.map)(response => response.data));
    }
    login(loginData) {
        return this.httpService.post('http://localhost:3001/api/v1/login', loginData)
            .pipe((0, operators_1.map)(response => response.data));
    }
};
__decorate([
    (0, common_1.Get)('api/v1/gateway/users'),
    __param(0, (0, common_1.Headers)('authorization')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "getAllUsers", null);
__decorate([
    (0, common_1.Get)('gateway/users/:id'),
    __param(0, (0, common_1.Headers)('authorization')),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "getUserById", null);
__decorate([
    (0, common_1.Patch)('gateway/users/:id'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Headers)('authorization')),
    __param(2, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_users_dto_1.UpdateUsersDto, Object, String]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "updateUserById", null);
__decorate([
    (0, common_1.Delete)('gateway/users/:id'),
    __param(0, (0, common_1.Headers)('authorization')),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "deleteUserById", null);
__decorate([
    (0, common_1.Post)('register'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_dto_1.RegisterUserDto]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "createUser", null);
__decorate([
    (0, common_1.Post)('login'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_dto_1.LoginUserDto]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "login", null);
exports.AppController = AppController = __decorate([
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [axios_1.HttpService])
], AppController);
//# sourceMappingURL=app.controller.js.map