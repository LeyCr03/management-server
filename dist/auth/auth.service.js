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
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("../entity/user.entity");
const user_service_1 = require("../service/user.service");
const typeorm_2 = require("typeorm");
const jwt_1 = require("@nestjs/jwt");
const bcrypt = require("bcrypt");
const env_1 = require("../config/env");
let AuthService = class AuthService {
    userRepository;
    userService;
    jwtService;
    constructor(userRepository, userService, jwtService) {
        this.userRepository = userRepository;
        this.userService = userService;
        this.jwtService = jwtService;
    }
    async register(createUserDto) {
        const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
        const user = this.userRepository.create({ ...createUserDto, password: hashedPassword });
        const savedUser = await this.userRepository.save(user);
        return {
            id: savedUser.id,
            email: savedUser.email,
            profileImage: savedUser.profileImage,
            description: savedUser.description,
            name: savedUser.name,
        };
    }
    async validateUser(email, password) {
        const user = await this.userService.findByEmail(email);
        if (!user) {
            return null;
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (user && isPasswordValid) {
            const { password, ...result } = user;
            return user;
        }
        return null;
    }
    async login(user) {
        const payload = { email: user.email, sub: user.id };
        const accessToken = this.jwtService.sign(payload, {
            secret: env_1.env.JWT_SECRET,
            expiresIn: '15m',
        });
        const refreshToken = this.jwtService.sign(payload, {
            secret: env_1.env.JWT_REFRESH_SECRET,
            expiresIn: '7d',
        });
        const refreshTokenHash = await bcrypt.hash(refreshToken, 10);
        await this.userService.updateRefreshTokenHash(user.id, refreshTokenHash);
        return {
            accessToken,
            refreshToken,
        };
    }
    async refreshTokens(req) {
        const { user_id, refreshToken: currentRefreshToken } = req.user;
        const user = await this.userService.getUserWithRefreshTokenHash(user_id);
        if (!user || !user.refreshTokenHash) {
            throw new common_1.UnauthorizedException('Refresh token is invalid or user not found');
        }
        const isRefreshTokenValid = await bcrypt.compare(currentRefreshToken, user.refreshTokenHash);
        if (!isRefreshTokenValid) {
            throw new common_1.UnauthorizedException('Invalid refresh token');
        }
        const payload = { email: user.email, sub: user.id };
        const newAccessToken = this.jwtService.sign(payload, {
            secret: env_1.env.JWT_SECRET,
            expiresIn: '15m',
        });
        const newRefreshToken = this.jwtService.sign(payload, {
            secret: env_1.env.JWT_REFRESH_SECRET,
            expiresIn: '7d',
        });
        const newRefreshTokenHash = await bcrypt.hash(newRefreshToken, 10);
        await this.userService.updateRefreshTokenHash(user_id, newRefreshTokenHash);
        return {
            accessToken: newAccessToken,
            refreshToken: newRefreshToken,
        };
    }
    async logout(user_id) {
        await this.userService.updateRefreshTokenHash(user_id, null);
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        user_service_1.UserService,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map