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
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("../service/user.service");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("../auth/guard/jwt-auth.guard");
const user_dto_1 = require("../dto/user.dto");
let UserController = class UserController {
    userService;
    constructor(userService) {
        this.userService = userService;
    }
    async getUserSubs(req) {
        return this.userService.getUserSubs(req.user.user_id);
    }
    async getUserPolls(req) {
        return this.userService.getUserPolls(req.user.user_id);
    }
    async findById(req) {
        return this.userService.getUserById(req.user.user_id);
    }
    async findbyEmail(req) {
        return this.userService.getUserByEmail(req.user.email);
    }
    async getSubscribers() { }
    async delete(req) {
        return this.userService.deleteUser(req.user.user_id);
    }
    async update(req, updateUserDto) {
        return this.userService.updateUser(req.user.user_id, updateUserDto);
    }
};
exports.UserController = UserController;
__decorate([
    (0, common_1.Get)('subs'),
    (0, swagger_1.ApiOperation)({ summary: "Get user's subscriptions" }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Subscriptions.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Not found.' }),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getUserSubs", null);
__decorate([
    (0, common_1.Get)('polls'),
    (0, swagger_1.ApiOperation)({ summary: "Get user's polls" }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Polls' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Polls Not found.' }),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getUserPolls", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: "Get user by ID" }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'User found succsesssfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'User Not found.' }),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "findById", null);
__decorate([
    (0, common_1.Get)('email'),
    (0, swagger_1.ApiOperation)({ summary: "Get user by Email" }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'User found succsesssfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'User Not found.' }),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "findbyEmail", null);
__decorate([
    (0, common_1.Delete)(),
    (0, swagger_1.ApiOperation)({ summary: "Delete user by ID" }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'User deleted succsesssfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'User Not found.' }),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "delete", null);
__decorate([
    (0, common_1.Put)(),
    (0, swagger_1.ApiOperation)({ summary: "Delete user by ID" }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'User deleted succsesssfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'User Not found.' }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, user_dto_1.UpdateUserDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "update", null);
exports.UserController = UserController = __decorate([
    (0, swagger_1.ApiTags)('Users'),
    (0, common_1.Controller)('api/users'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)('accessToken'),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
//# sourceMappingURL=user.controller.js.map