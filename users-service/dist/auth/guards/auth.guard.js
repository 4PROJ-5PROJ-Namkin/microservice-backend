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
exports.RolesGuard = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const jwt_1 = require("../utils/jwt");
let RolesGuard = class RolesGuard {
    constructor(reflector) {
        this.reflector = reflector;
    }
    async canActivate(context) {
        const requiredRoles = this.reflector.getAllAndOverride('roles', [context.getHandler(), context.getClass()]);
        const authorizationHeader = context.switchToHttp().getRequest().headers.authorization;
        if (!requiredRoles) {
            return true;
        }
        if (requiredRoles && !authorizationHeader) {
            throw new common_1.HttpException({ message: 'Unauthorized' }, 401);
        }
        if (!await (0, jwt_1.VerifyToken)(authorizationHeader.split(' ')[1])) {
            return false;
        }
        const tokenData = await (0, jwt_1.DecodeToken)(authorizationHeader.split(' ')[1]);
        if (requiredRoles.find(role => role === tokenData.role)) {
            return true;
        }
        else {
            return false;
        }
    }
};
RolesGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [core_1.Reflector])
], RolesGuard);
exports.RolesGuard = RolesGuard;
//# sourceMappingURL=auth.guard.js.map