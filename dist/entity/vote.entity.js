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
exports.Vote = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("./user.entity");
const poll_entity_1 = require("./poll.entity");
const choices_entity_1 = require("./choices.entity");
let Vote = class Vote {
    id;
    userId;
    pollId;
    choiceId;
    user;
    poll;
    choice;
};
exports.Vote = Vote;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Vote.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'uuid' }),
    __metadata("design:type", String)
], Vote.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'uuid' }),
    __metadata("design:type", String)
], Vote.prototype, "pollId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'uuid' }),
    __metadata("design:type", String)
], Vote.prototype, "choiceId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, user => user.votes, { onDelete: 'CASCADE' }),
    __metadata("design:type", user_entity_1.User)
], Vote.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => poll_entity_1.Poll, poll => poll.votes, { onDelete: 'CASCADE' }),
    __metadata("design:type", poll_entity_1.Poll)
], Vote.prototype, "poll", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => choices_entity_1.Choice, choice => choice.votes, { onDelete: 'CASCADE' }),
    __metadata("design:type", choices_entity_1.Choice)
], Vote.prototype, "choice", void 0);
exports.Vote = Vote = __decorate([
    (0, typeorm_1.Entity)({ name: 'votes' })
], Vote);
//# sourceMappingURL=vote.entity.js.map