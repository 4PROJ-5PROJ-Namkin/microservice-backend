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
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const app_service_1 = require("./app.service");
const swagger_1 = require("@nestjs/swagger");
let AppController = exports.AppController = class AppController {
    constructor(appService, client) {
        this.appService = appService;
        this.client = client;
    }
    onModuleInit() {
        this.usersService = this.client.getService('UsersService');
        this.authService = this.client.getService('AuthService');
    }
    async getHello() {
        try {
            const response = await this.usersService.getHello({}).toPromise();
            return response;
        }
        catch (error) {
            console.error('Erreur gRPC :', error);
            throw new common_1.HttpException(" " + error, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async getAllUsers(authHeader) {
        try {
            return await this.usersService.getAllUsers({}).toPromise();
        }
        catch (error) {
            console.error('' + error);
            throw new common_1.HttpException('Erreur lors de la récupération des utilisateurs', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async login(loginData) {
        try {
            const response = await this.authService.login(loginData).toPromise();
            return response;
        }
        catch (error) {
            console.error('' + error);
            throw new common_1.HttpException(error + ' ', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
__decorate([
    (0, common_1.Get)('hello'),
    openapi.ApiResponse({ status: 200, type: Object }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AppController.prototype, "getHello", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, common_1.Get)('gateway/users'),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, common_1.Headers)('authorization')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "getAllUsers", null);
__decorate([
    (0, common_1.Post)('login'),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "login", null);
exports.AppController = AppController = __decorate([
    (0, common_1.Controller)(),
    __param(1, (0, common_1.Inject)('USERS_SERVICE')),
    __metadata("design:paramtypes", [app_service_1.AppService, Object])
], AppController);
//# sourceMappingURL=app.controller.js.map