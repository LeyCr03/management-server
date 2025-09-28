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
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./auth.service");
const local_auth_guard_1 = require("./guard/local-auth.guard");
const jwt_auth_guard_1 = require("./guard/jwt-auth.guard");
const jwt_refresh_guard_1 = require("./guard/jwt-refresh.guard");
const auth_dto_1 = require("./auth.dto");
const swagger_1 = require("@nestjs/swagger");
const user_dto_1 = require("../dto/user.dto");
let AuthController = class AuthController {
    authService;
    constructor(authService) {
        this.authService = authService;
    }
    async register(createUserDto) {
        return this.authService.register(createUserDto);
    }
    async login(req) {
        return this.authService.login(req.user);
    }
    async refreshTokens(req) {
        return this.authService.refreshTokens(req);
    }
    async logout(req) {
        await this.authService.logout(req.user.user_id);
        return { message: 'Logged out successfully' };
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.Post)('/register'),
    (0, swagger_1.ApiOperation)({ summary: "Create new user" }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'User created successfully.', type: user_dto_1.CreateUserResponse }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Error.' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.CreateUserDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "register", null);
__decorate([
    (0, common_1.UseGuards)(local_auth_guard_1.LocalAuthGuard),
    (0, common_1.Post)('login'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Authenticate user and get access and refresh tokens' }),
    (0, swagger_1.ApiBody)({ type: auth_dto_1.LoginDto }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'User logged in successfully.', type: auth_dto_1.TokensDto }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized credentials.' }),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    (0, common_1.UseGuards)(jwt_refresh_guard_1.JwtRefreshGuard),
    (0, common_1.Post)('refresh'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Refresh access token using refresh token' }),
    (0, swagger_1.ApiBody)({ type: auth_dto_1.RefreshTokenDto }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Tokens refreshed successfully.', type: auth_dto_1.TokensDto }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Invalid or expired refresh token.' }),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "refreshTokens", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)('accessToken'),
    (0, common_1.Post)('logout'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Logout user and invalidate refresh token' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'User logged out successfully.' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized access.' }),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "logout", null);
exports.AuthController = AuthController = __decorate([
    (0, swagger_1.ApiTags)('Auth'),
    (0, common_1.Controller)('api/auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map