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
exports.Choice = void 0;
const poll_entity_1 = require("./poll.entity");
const user_entity_1 = require("./user.entity");
const typeorm_1 = require("typeorm");
const vote_entity_1 = require("./vote.entity");
let Choice = class Choice {
    id;
    userId;
    content;
    votes;
    user;
    poll;
};
exports.Choice = Choice;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Choice.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'uuid' }),
    __metadata("design:type", String)
], Choice.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], Choice.prototype, "content", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => vote_entity_1.Vote, (vote) => vote.choice),
    __metadata("design:type", Array)
], Choice.prototype, "votes", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, user => user.choices, { onDelete: 'CASCADE' }),
    __metadata("design:type", user_entity_1.User)
], Choice.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => poll_entity_1.Poll, poll => poll.choices, { onDelete: 'CASCADE' }),
    __metadata("design:type", poll_entity_1.Poll)
], Choice.prototype, "poll", void 0);
exports.Choice = Choice = __decorate([
    (0, typeorm_1.Entity)('choices')
], Choice);
//# sourceMappingURL=choices.entity.js.map