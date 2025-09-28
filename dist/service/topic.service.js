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
exports.TopicService = void 0;
const common_1 = require("@nestjs/common");
const injectable_decorator_1 = require("@nestjs/common/decorators/core/injectable.decorator");
const typeorm_1 = require("@nestjs/typeorm");
const topic_entity_1 = require("../entity/topic.entity");
const typeorm_2 = require("typeorm");
let TopicService = class TopicService {
    topicRepository;
    constructor(topicRepository) {
        this.topicRepository = topicRepository;
    }
    async findById(id) {
        return this.topicRepository.findOne({ where: { id } });
    }
    async findbyName(name) {
        return this.topicRepository.findOne({ where: { name } });
    }
    async createTopic(name) {
        let topic = await this.findbyName(name);
        if (!topic) {
            topic = await this.topicRepository.create({ name });
            this.topicRepository.save(topic);
        }
        return topic;
    }
    async deleteTopic(id) {
        const topic = await this.findById(id);
        if (!topic) {
            throw new common_1.NotFoundException('Topic not found');
        }
        await this.topicRepository.remove(topic);
        return { message: 'Topic removed' };
    }
};
exports.TopicService = TopicService;
exports.TopicService = TopicService = __decorate([
    (0, injectable_decorator_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(topic_entity_1.Topic)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], TopicService);
//# sourceMappingURL=topic.service.js.map