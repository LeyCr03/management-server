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
exports.SubService = void 0;
const common_1 = require("@nestjs/common");
const injectable_decorator_1 = require("@nestjs/common/decorators/core/injectable.decorator");
const typeorm_1 = require("@nestjs/typeorm");
const sub_entity_1 = require("../entity/sub.entity");
const user_entity_1 = require("../entity/user.entity");
const typeorm_2 = require("typeorm");
const poll_entity_1 = require("../entity/poll.entity");
let SubService = class SubService {
    subRepository;
    userRepository;
    pollRepository;
    constructor(subRepository, userRepository, pollRepository) {
        this.subRepository = subRepository;
        this.userRepository = userRepository;
        this.pollRepository = pollRepository;
    }
    async findById(id) {
        return this.subRepository.findOne({ where: { id } });
    }
    async createSub(userId, pollId) {
        const user = await this.userRepository.findOne({ where: { id: userId } });
        const poll = await this.pollRepository.findOne({ where: { id: pollId } });
        if (!user || !poll) {
            throw new common_1.NotFoundException('User or poll not found');
        }
        const existingSub = await this.subRepository.findOne({ where: { userId, pollId } });
        if (existingSub) {
            return { message: 'User is already subscribed to this poll' };
        }
        const newSub = this.subRepository.create({
            userId,
            pollId,
            user,
            poll,
        });
        await this.subRepository.save(newSub);
        return { message: 'Subscribed successfully' };
    }
    async deleteSub(id) {
        const sub = await this.findById(id);
        if (!sub) {
            throw new common_1.NotFoundException('Subscription not found');
        }
        await this.subRepository.remove(sub);
        return { message: 'This user is not longger subscribed to this poll' };
    }
};
exports.SubService = SubService;
exports.SubService = SubService = __decorate([
    (0, injectable_decorator_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(sub_entity_1.Sub)),
    __param(1, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(2, (0, typeorm_1.InjectRepository)(poll_entity_1.Poll)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], SubService);
//# sourceMappingURL=sub.service.js.map