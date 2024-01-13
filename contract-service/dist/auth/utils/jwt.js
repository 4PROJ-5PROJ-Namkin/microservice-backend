"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DecodeToken = exports.VerifyToken = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const constants_1 = require("../constants");
let jwtService = new jwt_1.JwtService({ secret: constants_1.jwtConstants.secret });
async function VerifyToken(token) {
    try {
        const verified = jwtService.verify(token);
        return verified != null;
    }
    catch (error) {
        throw new common_1.HttpException({ message: 'Token is expired or invalid' }, common_1.HttpStatus.UNAUTHORIZED);
    }
}
exports.VerifyToken = VerifyToken;
async function DecodeToken(token) {
    try {
        return jwtService.decode(token);
    }
    catch (error) {
        throw new common_1.HttpException({ message: 'Error decoding token' }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
exports.DecodeToken = DecodeToken;
//# sourceMappingURL=jwt.js.map