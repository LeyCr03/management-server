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
exports.PollController = void 0;
const common_1 = require("@nestjs/common");
const poll_service_1 = require("../service/poll.service");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("../auth/guard/jwt-auth.guard");
const poll_dto_1 = require("../dto/poll.dto");
let PollController = class PollController {
    pollService;
    constructor(pollService) {
        this.pollService = pollService;
    }
    async getUserSubs(id) {
        return this.pollService.getPollById(id);
    }
    async create(createPollDto) {
        return this.pollService.createPoll(createPollDto);
    }
    async update(id, updatePollDto) {
        return this.pollService.updatePoll(id, updatePollDto);
    }
    async delete(id) {
        return this.pollService.deletePoll(id);
    }
    async getPollSubs(id) {
        return this.pollService.getPollSubsCount(id);
    }
    async getPollById(id) {
        const poll = await this.pollService.findById(id);
        if (!poll) {
            throw new common_1.NotFoundException('Poll not found');
        }
        return poll;
    }
    async getPollMetrics(id, req) {
        return this.pollService.getPollMetrics(id, req.user.user_id);
    }
    async getAll() {
        return this.pollService.getAllPolls();
    }
    async getPollsBySubs() {
        return this.pollService.getPollsBySubs();
    }
    async getPollsByTopic(topicName) {
        return this.pollService.getPollsByTopic(topicName);
    }
};
exports.PollController = PollController;
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: "Get poll by ID" }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Poll' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Poll Not found.' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PollController.prototype, "getUserSubs", null);
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: "Create a new poll" }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'New Poll' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'User Not found.' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [poll_dto_1.CreatePollDto]),
    __metadata("design:returntype", Promise)
], PollController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(':id/poll'),
    (0, swagger_1.ApiOperation)({ summary: "Update a poll by id" }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Poll updated' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Poll Not found.' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, poll_dto_1.UpdatePollDto]),
    __metadata("design:returntype", Promise)
], PollController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: "Delete a poll by id" }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Poll deleted' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Poll Not found.' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PollController.prototype, "delete", null);
__decorate([
    (0, common_1.Get)(':id/poll-subs-count'),
    (0, swagger_1.ApiOperation)({ summary: "Get subscribers count by poll id" }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Number of subscribers for the poll with ID ${id}' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Poll Not found.' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PollController.prototype, "getPollSubs", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get a poll by ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Poll found.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Poll not found.' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PollController.prototype, "getPollById", null);
__decorate([
    (0, common_1.Get)('poll-metrics/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get poll metrics by its ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Poll found.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Poll not found.' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], PollController.prototype, "getPollMetrics", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get a poll by ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Poll found.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Poll not found.' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PollController.prototype, "getAll", null);
__decorate([
    (0, common_1.Get)('by-subs'),
    (0, swagger_1.ApiOperation)({ summary: 'Get polls ordered by subscription count' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Polls ordered by subscriptions.' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PollController.prototype, "getPollsBySubs", null);
__decorate([
    (0, common_1.Get)('by-topic/:topicName'),
    (0, swagger_1.ApiOperation)({ summary: 'Get polls by topic name' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Polls by topic.' }),
    __param(0, (0, common_1.Param)('topicName')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PollController.prototype, "getPollsByTopic", null);
exports.PollController = PollController = __decorate([
    (0, swagger_1.ApiTags)('Polls'),
    (0, common_1.Controller)('api/polls'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [poll_service_1.PollService])
], PollController);
//# sourceMappingURL=poll.controller.js.map