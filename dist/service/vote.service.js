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
exports.VoteService = void 0;
const common_1 = require("@nestjs/common");
const injectable_decorator_1 = require("@nestjs/common/decorators/core/injectable.decorator");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const vote_entity_1 = require("../entity/vote.entity");
let VoteService = class VoteService {
    voteRepository;
    constructor(voteRepository) {
        this.voteRepository = voteRepository;
    }
    async findById(id) {
        return this.voteRepository.findOne({ where: { id } });
    }
    async createVote(userId, pollId, choiceId) {
        const existingVote = await this.voteRepository.findOne({ where: { userId, pollId, choiceId } });
        if (existingVote) {
            return existingVote;
        }
        const vote = this.voteRepository.create({
            userId,
            pollId,
            choiceId
        });
        await this.voteRepository.save(vote);
        return vote;
    }
    async deleteVote(id) {
        const vote = await this.findById(id);
        if (!vote) {
            throw new common_1.NotFoundException('User have not voted yet');
        }
        await this.voteRepository.remove(vote);
        return { message: 'Vote deleted' };
    }
};
exports.VoteService = VoteService;
exports.VoteService = VoteService = __decorate([
    (0, injectable_decorator_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(vote_entity_1.Vote)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], VoteService);
//# sourceMappingURL=vote.service.js.map