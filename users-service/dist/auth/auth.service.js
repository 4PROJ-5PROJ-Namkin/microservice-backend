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
exports.AuthService = void 0;
const argon2 = require('argon2');
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const jwt_1 = require("./utils/jwt");
const users_entity_1 = require("../users/entities/users.entity");
let AuthService = class AuthService {
    constructor(usersRepository) {
        this.usersRepository = usersRepository;
    }
    async login(loginData) {
        const user = await this.usersRepository.findOne({ where: { email: loginData.email }, select: ['id', 'password', 'role'] });
        if (!user)
            throw new common_1.HttpException({ message: 'User not found' }, common_1.HttpStatus.BAD_REQUEST);
        if (await argon2.verify(user.password, loginData.password)) {
            try {
                return await (0, jwt_1.GenerateToken)({ id: user.id, role: user.role });
            }
            catch (error) {
                throw new common_1.HttpException({ message: 'Error during token generation' }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
        else {
            throw new common_1.HttpException({ message: 'Wrong password' }, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async createCommercial(user) {
        if (await this.usersRepository.findOneBy({ email: user.email }) || await this.usersRepository.findOneBy({ email: user.email }))
            throw new common_1.HttpException({ message: 'User may already exist' }, common_1.HttpStatus.BAD_REQUEST);
        const customerData = {
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            telephoneNumber: user.telephoneNumber,
            password: await argon2.hash(user.password),
            role: 'commercial'
        };
        try {
            await this.usersRepository.save(this.usersRepository.create(customerData));
        }
        catch (error) {
            throw new common_1.HttpException({ message: 'Error creating user' }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async createAdmin(user) {
        if (await this.usersRepository.findOneBy({ email: user.email }) || await this.usersRepository.findOneBy({ email: user.email }))
            throw new common_1.HttpException({ message: 'User may already exist' }, common_1.HttpStatus.BAD_REQUEST);
        const adminData = {
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            telephoneNumber: user.telephoneNumber,
            password: await argon2.hash(user.password),
            role: 'admin'
        };
        try {
            await this.usersRepository.save(this.usersRepository.create(adminData));
        }
        catch (error) {
            throw new common_1.HttpException({ message: 'Error creating user' }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(users_entity_1.default)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map