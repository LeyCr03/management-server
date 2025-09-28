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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Poll = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("./user.entity");
const sub_entity_1 = require("./sub.entity");
const topic_entity_1 = require("./topic.entity");
const comment_entity_1 = require("./comment.entity");
const vote_entity_1 = require("./vote.entity");
const choices_entity_1 = require("./choices.entity");
let Poll = class Poll {
    id;
    userId;
    user;
    header;
    description;
    image;
    choices;
    created_at;
    expiration;
    isArchived;
    subs;
    topic;
    comments;
    votes;
};
exports.Poll = Poll;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Poll.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'uuid' }),
    __metadata("design:type", String)
], Poll.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, user => user.polls, { onDelete: 'CASCADE' }),
    __metadata("design:type", user_entity_1.User)
], Poll.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], Poll.prototype, "header", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", Object)
], Poll.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', nullable: true }),
    __metadata("design:type", Object)
], Poll.prototype, "image", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => choices_entity_1.Choice, (choice) => choice.poll),
    __metadata("design:type", Array)
], Poll.prototype, "choices", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: 'timestamp' }),
    __metadata("design:type", Date)
], Poll.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: 'date' }),
    __metadata("design:type", Object)
], Poll.prototype, "expiration", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', default: false }),
    __metadata("design:type", Boolean)
], Poll.prototype, "isArchived", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => sub_entity_1.Sub, (sub) => sub.poll),
    __metadata("design:type", Array)
], Poll.prototype, "subs", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => topic_entity_1.Topic, (topic) => topic.poll),
    __metadata("design:type", topic_entity_1.Topic)
], Poll.prototype, "topic", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => comment_entity_1.Comment, (comment) => comment.poll),
    __metadata("design:type", Array)
], Poll.prototype, "comments", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => vote_entity_1.Vote, (vote) => vote.poll),
    __metadata("design:type", Array)
], Poll.prototype, "votes", void 0);
exports.Poll = Poll = __decorate([
    (0, typeorm_1.Entity)('polls')
], Poll);
//# sourceMappingURL=poll.entity.js.map