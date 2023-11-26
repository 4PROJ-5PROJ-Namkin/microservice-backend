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
exports.RegisterController = exports.LoginController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./auth.service");
const auth_dto_1 = require("./dto/auth.dto");
const swagger_1 = require("@nestjs/swagger");
const auth_decorator_1 = require("./guards/auth.decorator");
const auth_enum_1 = require("./guards/auth.enum");
let LoginController = class LoginController {
    constructor(authService) {
        this.authService = authService;
    }
    async login(loginData) {
        return this.authService.login(loginData);
    }
};
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ transform: true })),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'User not found' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Error during token generation' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Wrong password' }),
    openapi.ApiResponse({ status: 201, type: require("./dto/auth.dto").Token }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_dto_1.LoginUserDto]),
    __metadata("design:returntype", Promise)
], LoginController.prototype, "login", null);
LoginController = __decorate([
    (0, swagger_1.ApiTags)('Authentification '),
    (0, common_1.Controller)('login'),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], LoginController);
exports.LoginController = LoginController;
let RegisterController = class RegisterController {
    constructor(authService) {
        this.authService = authService;
    }
    async createCommercial(userData) {
        return this.authService.createCommercial(userData);
    }
    async createAdmin(userData) {
        return this.authService.createAdmin(userData);
    }
};
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ transform: true })),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'User may already exist' }),
    (0, swagger_1.ApiResponse)({ status: 500, description: 'Error creating user' }),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_dto_1.RegisterUserDto]),
    __metadata("design:returntype", Promise)
], RegisterController.prototype, "createCommercial", null);
__decorate([
    (0, auth_decorator_1.Roles)(auth_enum_1.Role.ADMIN),
    (0, common_1.Post)('admin'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ transform: true })),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'User may already exist' }),
    (0, swagger_1.ApiResponse)({ status: 500, description: 'Error creating user' }),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_dto_1.RegisterUserDto]),
    __metadata("design:returntype", Promise)
], RegisterController.prototype, "createAdmin", null);
RegisterController = __decorate([
    (0, swagger_1.ApiTags)('Authentification '),
    (0, common_1.Controller)('register'),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], RegisterController);
exports.RegisterController = RegisterController;
//# sourceMappingURL=auth.controller.js.map