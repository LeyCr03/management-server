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
exports.VoteController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("../auth/guard/jwt-auth.guard");
const vote_service_1 = require("../service/vote.service");
let VoteController = class VoteController {
    voteService;
    constructor(voteService) {
        this.voteService = voteService;
    }
    async createSub(req, pollId, choiceId) {
        return this.voteService.createVote(req.user.user_id, pollId, choiceId);
    }
    async deleteSub(id) {
        return this.voteService.deleteVote(id);
    }
};
exports.VoteController = VoteController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Subscribe to a poll' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Subscription created successfully.' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Bad Request.' }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)()),
    __param(2, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", Promise)
], VoteController.prototype, "createSub", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Unsubscribe from a poll' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Unsubscribed successfully.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Subscription not found.' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], VoteController.prototype, "deleteSub", null);
exports.VoteController = VoteController = __decorate([
    (0, swagger_1.ApiTags)('Votes'),
    (0, common_1.Controller)('api/votes'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)('accessToken'),
    __metadata("design:paramtypes", [vote_service_1.VoteService])
], VoteController);
//# sourceMappingURL=vote.controller.js.map