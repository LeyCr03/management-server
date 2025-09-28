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
exports.ChoiceController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("../auth/guard/jwt-auth.guard");
const choices_service_1 = require("../service/choices.service");
let ChoiceController = class ChoiceController {
    choiceService;
    constructor(choiceService) {
        this.choiceService = choiceService;
    }
    async createSub(content) {
        return this.choiceService.createChoice(content);
    }
    async deleteSub(id) {
        return this.choiceService.deleteChoice(id);
    }
};
exports.ChoiceController = ChoiceController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create a choice' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Choice created successfully.' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Bad Request.' }),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ChoiceController.prototype, "createSub", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete a choice' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Choice deleted successfully.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Choice not found.' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ChoiceController.prototype, "deleteSub", null);
exports.ChoiceController = ChoiceController = __decorate([
    (0, swagger_1.ApiTags)('Choices'),
    (0, common_1.Controller)('api/choices'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)('accessToken'),
    __metadata("design:paramtypes", [choices_service_1.ChoiceService])
], ChoiceController);
//# sourceMappingURL=choices.controller.js.map