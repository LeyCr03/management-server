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
exports.UserService = void 0;
const typeorm_1 = require("@nestjs/typeorm");
const poll_entity_1 = require("../entity/poll.entity");
const user_entity_1 = require("../entity/user.entity");
const typeorm_2 = require("typeorm");
const common_1 = require("@nestjs/common");
const sub_entity_1 = require("../entity/sub.entity");
const vote_entity_1 = require("../entity/vote.entity");
let UserService = class UserService {
    userRepository;
    pollRepository;
    subRepository;
    voteRepository;
    constructor(userRepository, pollRepository, subRepository, voteRepository) {
        this.userRepository = userRepository;
        this.pollRepository = pollRepository;
        this.subRepository = subRepository;
        this.voteRepository = voteRepository;
    }
    async findById(id) {
        return this.userRepository.findOne({ where: { id } });
    }
    async findByEmail(email) {
        return this.userRepository.findOne({ where: { email } });
    }
    async getUserById(id) {
        const user = await this.findById(id);
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        return {
            id: user.id,
            email: user.email,
            profileImage: user.profileImage || null,
            description: user.description,
            name: user.name
        };
    }
    async getUserByEmail(email) {
        const user = await this.findByEmail(email);
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        return {
            id: user.id,
            email: user.email,
            profileImage: user.profileImage || null,
            description: user.description,
            name: user.name
        };
    }
    async updateRefreshTokenHash(userId, refreshTokenHash) {
        await this.userRepository.update(userId, { refreshTokenHash });
    }
    async getUserWithRefreshTokenHash(userId) {
        return this.userRepository.findOne({
            where: { id: userId },
            select: ['id', 'email', 'password', 'refreshTokenHash'],
        });
    }
    async isUserSubscribed(userId, pollId) {
        let isSubscribed = true;
        const sub = await this.subRepository.findOne({ where: { userId, pollId } });
        if (!sub) {
            isSubscribed = false;
        }
        return isSubscribed;
    }
    async getUserPolls(userId) {
        const queryBuilder = this.pollRepository
            .createQueryBuilder('poll')
            .where('poll.userId = :userId', { userId })
            .orderBy('poll.created_at', 'ASC');
        const polls = await queryBuilder.getMany();
        const pollsResponse = polls.map(poll => ({
            pollId: poll.id,
            userId: poll.userId,
            header: poll.header,
            description: poll.description || null,
            created_at: poll.created_at,
            image: poll.image || null,
            choices: poll.choices.map((st) => (st.content)),
            expiration: poll.expiration,
            isArchived: poll.isArchived,
            topic: poll.topic?.name,
            comments: poll.comments.length,
            subs: poll.subs.length,
        }));
        return pollsResponse;
    }
    async getUserSubs(userId) {
        const queryBuilder = this.pollRepository
            .createQueryBuilder('polls')
            .innerJoin('polls.subs', 'subs')
            .where('subs.userId = :userId', { userId: userId })
            .orderBy('poll.created_at', 'ASC');
        const polls = await queryBuilder.getMany();
        const subsResponse = polls.map(poll => ({
            pollId: poll.id,
            userId: poll.userId,
            userImage: poll.user.profileImage,
            username: poll.user.name,
            header: poll.header,
            description: poll.description || null,
            created_at: poll.created_at,
            image: poll.image || null,
            choices: poll.choices.map((st) => (st.content)),
            expiration: poll.expiration,
            topic: poll.topic.name,
            comments: poll.comments.length,
            subs: poll.subs.length,
            isArchived: poll.isArchived
        }));
        return subsResponse;
    }
    async getSubscriptionCount(userId) {
        const count = await this.subRepository
            .createQueryBuilder('sub')
            .where('sub.userId = :userId', { userId })
            .getCount();
        return count;
    }
    async getVotesCount(userId) {
        const count = await this.voteRepository
            .createQueryBuilder('vote')
            .where('vote.userId = :userId', { userId })
            .getCount();
        return count;
    }
    async deleteUser(id) {
        const user = await this.userRepository.findOne({ where: { id } });
        if (!user) {
            throw new common_1.NotFoundException('User with ID ${id} not found.');
        }
        await this.userRepository.remove(user);
        return { message: ' User deleted Succsessfully' };
    }
    async updateUser(id, updateUserDto) {
        const user = await this.findById(id);
        if (!user) {
            throw new common_1.NotFoundException('User with ID ${id} not found.');
        }
        await this.userRepository.update(id, updateUserDto);
        return { message: ' User Updated' };
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(1, (0, typeorm_1.InjectRepository)(poll_entity_1.Poll)),
    __param(2, (0, typeorm_1.InjectRepository)(sub_entity_1.Sub)),
    __param(3, (0, typeorm_1.InjectRepository)(vote_entity_1.Vote)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], UserService);
//# sourceMappingURL=user.service.js.map