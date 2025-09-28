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
exports.PollService = void 0;
const typeorm_1 = require("@nestjs/typeorm");
const poll_entity_1 = require("../entity/poll.entity");
const user_entity_1 = require("../entity/user.entity");
const typeorm_2 = require("typeorm");
const common_1 = require("@nestjs/common");
const sub_entity_1 = require("../entity/sub.entity");
const topic_entity_1 = require("../entity/topic.entity");
const topic_service_1 = require("./topic.service");
const vote_entity_1 = require("../entity/vote.entity");
const choices_service_1 = require("./choices.service");
const choices_entity_1 = require("../entity/choices.entity");
const user_service_1 = require("./user.service");
let PollService = class PollService {
    userRepository;
    pollRepository;
    topicRepository;
    subRepository;
    voteRepository;
    choiceRepository;
    topicService;
    userService;
    choiceService;
    constructor(userRepository, pollRepository, topicRepository, subRepository, voteRepository, choiceRepository, topicService, userService, choiceService) {
        this.userRepository = userRepository;
        this.pollRepository = pollRepository;
        this.topicRepository = topicRepository;
        this.subRepository = subRepository;
        this.voteRepository = voteRepository;
        this.choiceRepository = choiceRepository;
        this.topicService = topicService;
        this.userService = userService;
        this.choiceService = choiceService;
    }
    async findById(id) {
        return this.pollRepository.findOne({ where: { id } });
    }
    async getPollById(id) {
        const poll = await this.findById(id);
        if (!poll) {
            throw new common_1.NotFoundException('No poll found');
        }
        return {
            pollId: poll.id,
            userId: poll.user.id,
            userImage: poll.user.profileImage,
            username: poll.user.name,
            header: poll.header,
            description: poll.description || null,
            created_at: poll.created_at,
            image: poll.image || null,
            choices: poll.choices.map((st) => (st.content)),
            expiration: poll.expiration,
            topic: poll.topic.name,
            isArchived: poll.isArchived,
            comments: poll.comments.length,
            subs: poll.subs.length
        };
    }
    async createPoll(createPollDto) {
        const userId = createPollDto.userId;
        const user = await this.userService.findById(userId);
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        const choices = await Promise.all(createPollDto.choices.map(async (st) => {
            return await this.choiceService.createChoice(st);
        }));
        const topicName = createPollDto.topic;
        let topic = await this.topicRepository.findOne({ where: { name: topicName } });
        let expiration_date = createPollDto.expiration;
        if (!topic) {
            topic = await this.topicService.createTopic(topicName);
        }
        if (!expiration_date) {
            createPollDto.isArchived = true;
        }
        const poll = this.pollRepository.create({ ...createPollDto, user, topic, choices });
        await this.pollRepository.save(poll);
        return {
            pollId: poll.id,
            userId: poll.user.id,
            userImage: poll.user.profileImage,
            username: poll.user.name,
            header: poll.header,
            description: poll.description || null,
            created_at: poll.created_at,
            image: poll.image || null,
            choices: poll.choices.map((st) => (st.content)),
            expiration: poll.expiration,
            topic: poll.topic.name,
            isArchived: poll.isArchived,
            comments: poll.comments.length,
            subs: poll.subs.length
        };
    }
    async deletePoll(id) {
        const poll = await this.pollRepository.findOne({ where: { id } });
        if (!poll) {
            throw new common_1.NotFoundException('Poll not found.');
        }
        await this.pollRepository.remove(poll);
        return { message: 'Poll deleted Succsessfully' };
    }
    async updatePoll(id, updatePollDto) {
        const poll = await this.findById(id);
        if (!poll) {
            throw new common_1.NotFoundException('Poll not found');
        }
        let expiration_date = updatePollDto.expiration;
        if (expiration_date) {
            updatePollDto.isArchived = false;
        }
        await this.pollRepository.update(id, updatePollDto);
        return { message: 'Poll updated' };
    }
    async getPollSubsCount(id) {
        const count = await this.subRepository
            .createQueryBuilder('sub')
            .where('sub.pollId = :pollId', { id })
            .getCount();
        return count;
    }
    async getPollSubs(pollId) {
        const subs = await this.subRepository.find({
            where: { pollId },
            relations: ['user'],
        });
        const users = subs.map(sub => sub.user);
        return users;
    }
    async getPollsByTopic(topicName) {
        const polls = await this.pollRepository.find({
            where: {
                topic: { name: topicName },
            },
            relations: ['user', 'topic'],
        });
        if (!polls) {
            throw new common_1.NotFoundException('Not found polls with the same topic');
        }
        return polls.map(poll => ({
            pollId: poll.id,
            userId: poll.user.id,
            userImage: poll.user.profileImage || null,
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
    }
    async getPollsBySubs() {
        const pollsWithSubCounts = await this.pollRepository
            .createQueryBuilder('poll')
            .leftJoinAndSelect('poll.user', 'user')
            .leftJoinAndSelect('poll.topic', 'topic')
            .leftJoinAndSelect('poll.subs', 'sub')
            .leftJoinAndSelect('poll.comments', 'comment')
            .leftJoinAndSelect('poll.choices', 'choice')
            .select([
            'poll.id As pollId',
            'user.id AS userId',
            'user.profileImage As userImage',
            'user.name AS username',
            'poll.header',
            'poll.description',
            'poll.created_at',
            'poll.image',
            'choice.content AS choiceContent',
            'poll.expiration',
            'topic.name AS topic',
            'COUNT(comment.id) AS commentCount',
            'COUNT(sub.id) AS subCount',
        ])
            .groupBy('poll.id, user.id, topic.name, comment.id')
            .orderBy('subCount', 'DESC')
            .getRawMany();
        return pollsWithSubCounts.map(poll => ({
            pollId: poll.pollId,
            userId: poll.userId,
            userImage: poll.userImage,
            username: poll.username,
            header: poll.header,
            description: poll.description,
            created_at: poll.created_at,
            image: poll.image,
            choices: poll.choiceContent,
            expiration: poll.expiration,
            topic: poll.topic,
            comments: Number(poll.commentCount),
            subs: Number(poll.subCount),
            isArchived: poll.isAchived
        }));
    }
    async getAllPolls() {
        const polls = await this.pollRepository
            .createQueryBuilder('poll')
            .leftJoinAndSelect('poll.user', 'user')
            .leftJoinAndSelect('poll.topic', 'topic')
            .leftJoinAndSelect('poll.subs', 'sub')
            .leftJoinAndSelect('poll.comments', 'comment')
            .leftJoinAndSelect('poll.choices', 'choice')
            .select([
            'poll.id As pollId',
            'user.id AS userId',
            'user.profileImage As userImage',
            'user.name AS username',
            'poll.header',
            'poll.description',
            'poll.created_at',
            'poll.image',
            'choice.content AS choiceContent',
            'poll.expiration',
            'topic.name AS topic',
            'COUNT(comment.id) AS commentCount',
            'COUNT(sub.id) AS subCount',
        ])
            .groupBy('poll.id, user.id, topic.name, comment.id')
            .getRawMany();
        return polls.map(poll => ({
            pollId: poll.pollId,
            userId: poll.userId,
            userImage: poll.userImage,
            username: poll.username,
            header: poll.header,
            description: poll.description,
            created_at: poll.created_at,
            image: poll.image,
            choices: poll.choiceContent,
            expiration: poll.expiration,
            topic: poll.topic,
            comments: Number(poll.commentCount),
            subs: Number(poll.subCount),
            isArchived: poll.isAchived
        }));
    }
    async getPollsByVotes() {
        const pollsWithSubCounts = await this.pollRepository
            .createQueryBuilder('poll')
            .leftJoinAndSelect('poll.user', 'user')
            .leftJoinAndSelect('poll.topic', 'topic')
            .leftJoinAndSelect('poll.subs', 'sub')
            .leftJoinAndSelect('poll.comments', 'comment')
            .leftJoinAndSelect('poll.votes', 'votes')
            .select([
            'poll.id As pollId',
            'user.id AS userId',
            'user.profileImage As userImage',
            'user.name AS username',
            'poll.header',
            'poll.description',
            'poll.created_at',
            'poll.image',
            'poll.choices',
            'poll.expiration',
            'topic.name AS topic',
            'COUNT(comment.id) AS commentCount',
            'COUNT(sub.id) AS subCount',
            'COUNT(vote.id) AS voteCount'
        ])
            .groupBy('poll.id, user.id, topic.name, comment.id')
            .orderBy('voteCount', 'DESC')
            .getRawMany();
        return pollsWithSubCounts.map(poll => ({
            pollId: poll.pollId,
            userId: poll.userId,
            userImage: poll.userImage,
            username: poll.username,
            header: poll.header,
            description: poll.description,
            created_at: poll.created_at,
            image: poll.image,
            choices: poll.choices,
            expiration: poll.expiration,
            topic: poll.topic,
            comments: Number(poll.commentCount),
            subs: Number(poll.subCount),
            isArchived: poll.isAchived
        }));
    }
    async getPollVotesCount(id) {
        const poll = await this.findById(id);
        return poll?.votes.length;
    }
    async getUserVote(id, userId) {
        const poll = await this.findById(id);
        if (!poll) {
            throw new common_1.NotFoundException('poll not found');
        }
        else {
            const pollChoices = poll.choices;
            let c = 0;
            while (c < pollChoices.length) {
                if (pollChoices[c].userId === userId) {
                    return c;
                }
                else {
                    c++;
                }
            }
            return null;
        }
    }
    async getPollMetrics(id, userId) {
        const poll = await this.findById(id);
        if (!poll) {
            throw new common_1.NotFoundException('poll not found');
        }
        else {
            const pollChoices = poll.choices;
            const userVote = await this.getUserVote(userId, id);
            const votesPerChoice = await Promise.all(pollChoices.map((st) => {
                return {
                    value: st.content,
                    ammount: st.votes.length
                };
            }));
            const isSubscribed = await this.userService.isUserSubscribed(id, userId);
            return {
                pollId: id,
                total: poll.votes.length,
                userVote: userVote,
                useSubscribed: isSubscribed,
                options: votesPerChoice
            };
        }
    }
};
exports.PollService = PollService;
exports.PollService = PollService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(1, (0, typeorm_1.InjectRepository)(poll_entity_1.Poll)),
    __param(2, (0, typeorm_1.InjectRepository)(topic_entity_1.Topic)),
    __param(3, (0, typeorm_1.InjectRepository)(sub_entity_1.Sub)),
    __param(4, (0, typeorm_1.InjectRepository)(vote_entity_1.Vote)),
    __param(5, (0, typeorm_1.InjectRepository)(choices_entity_1.Choice)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        topic_service_1.TopicService,
        user_service_1.UserService,
        choices_service_1.ChoiceService])
], PollService);
//# sourceMappingURL=poll.service.js.map