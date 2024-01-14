"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DecodeToken = exports.VerifyToken = exports.GenerateToken = void 0;
const common_1 = require("@nestjs/common");
const constant_1 = require("./constant");
let jwt = require('jsonwebtoken');
async function GenerateToken(params) {
    try {
        return await jwt.sign({
            id: params.id,
            role: params.role,
            iat: Math.floor(Date.now() / 1000),
            exp: Math.floor(Date.now() / 1000) + (60 * 60),
        }, constant_1.JWT_SECRET);
    }
    catch (error) {
        throw new common_1.HttpException({ message: 'Error generating token' }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
exports.GenerateToken = GenerateToken;
async function VerifyToken(token) {
    try {
        const verified = await jwt.verify(token, constant_1.JWT_SECRET);
        return verified;
    }
    catch (error) {
        throw new common_1.HttpException({ message: 'Token is expired or invalid' }, 401);
    }
}
exports.VerifyToken = VerifyToken;
async function DecodeToken(token) {
    try {
        return await jwt.decode(token);
    }
    catch (error) {
        throw new common_1.HttpException({ message: 'Error decoding token' }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
exports.DecodeToken = DecodeToken;
//# sourceMappingURL=jwt.js.map