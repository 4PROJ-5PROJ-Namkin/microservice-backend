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
exports.UsersService = void 0;
const argon2 = require('argon2');
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const users_entity_1 = require("./entities/users.entity");
const jwt_1 = require("../auth/utils/jwt");
const microservices_1 = require("@nestjs/microservices");
let UsersService = class UsersService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async getHello() {
        return { message: 'Je suis dans users-service' };
    }
    async findAllUsers(headers) {
        const token = await headers.authorization.split(' ')[1];
        const decoded = await (0, jwt_1.DecodeToken)(token);
        try {
            switch (decoded.role) {
                case 'commercial':
                    return await this.userRepository.findBy({ role: 'commercial' });
                case 'admin':
                    return await this.userRepository.find();
            }
        }
        catch (error) {
            throw new common_1.HttpException({ message: 'Error finding users' }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async findById(id, headers) {
        const token = await headers.authorization.split(' ')[1];
        const decoded = await (0, jwt_1.DecodeToken)(token);
        if (decoded.role === 'commercial' && decoded.id !== id) {
            throw new common_1.HttpException({ message: 'You are not allowed to access this resource' }, common_1.HttpStatus.UNAUTHORIZED);
        }
        if (decoded.id === id) {
            const user = await this.userRepository.findOneBy({ id });
            if (!user)
                throw new common_1.HttpException({ message: 'User not found' }, common_1.HttpStatus.NOT_FOUND);
            else
                return user;
        }
        if (decoded.role === 'commercial') {
            const user = await this.userRepository.findOneBy({ id, role: 'commercial' });
            if (!user)
                throw new common_1.HttpException({ message: 'User not found' }, common_1.HttpStatus.NOT_FOUND);
            else
                return user;
        }
        if (decoded.role === 'admin') {
            const user = await this.userRepository.findOneBy({ id });
            if (!user)
                throw new common_1.HttpException({ message: 'User not found' }, common_1.HttpStatus.NOT_FOUND);
            else
                return user;
        }
    }
    async updatePassword(id, updatePasswordUserDto) {
        const user = await this.userRepository.findOneBy({ id });
        if (!user)
            throw new common_1.HttpException({ message: 'User not found.' }, common_1.HttpStatus.NOT_FOUND);
        else {
            const userData = {
                password: await argon2.hash(updatePasswordUserDto.password),
            };
            return await this.userRepository.update({ id }, userData);
        }
    }
    async remove(id) {
        const user = await this.userRepository.findOneBy({ id });
        if (!user)
            throw new common_1.HttpException({ message: 'User not found.' }, common_1.HttpStatus.NOT_FOUND);
        else
            return await this.userRepository.delete({ id });
    }
};
__decorate([
    (0, microservices_1.GrpcMethod)('UsersService', 'getHello'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UsersService.prototype, "getHello", null);
__decorate([
    (0, microservices_1.GrpcMethod)('UserService', 'getAllUsers'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersService.prototype, "findAllUsers", null);
UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(users_entity_1.Users)),
    __metadata("design:paramtypes", [typeorm_1.Repository])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map