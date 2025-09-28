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
exports.TopicController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("../auth/guard/jwt-auth.guard");
const topic_service_1 = require("../service/topic.service");
let TopicController = class TopicController {
    topicService;
    constructor(topicService) {
        this.topicService = topicService;
    }
    async getTopicById(id) {
        const topic = await this.topicService.findById(id);
        if (!topic) {
            throw new common_1.NotFoundException('Topic not found');
        }
        return topic;
    }
    async createTopic(name) {
        return this.topicService.createTopic(name);
    }
    async deleteTopic(id) {
        return this.topicService.deleteTopic(id);
    }
};
exports.TopicController = TopicController;
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get topic by ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Topic found.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Topic not found.' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TopicController.prototype, "getTopicById", null);
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new topic' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Topic created successfully.' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Bad Request.' }),
    __param(0, (0, common_1.Body)('name')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TopicController.prototype, "createTopic", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete a topic' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Topic deleted successfully.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Topic not found.' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TopicController.prototype, "deleteTopic", null);
exports.TopicController = TopicController = __decorate([
    (0, swagger_1.ApiTags)('Topics'),
    (0, common_1.Controller)('api/topics'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)('accessToken'),
    __metadata("design:paramtypes", [topic_service_1.TopicService])
], TopicController);
//# sourceMappingURL=topic.controller.js.map