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
exports.User = void 0;
const typeorm_1 = require("typeorm");
const poll_entity_1 = require("./poll.entity");
const sub_entity_1 = require("./sub.entity");
const comment_entity_1 = require("./comment.entity");
const vote_entity_1 = require("./vote.entity");
const choices_entity_1 = require("./choices.entity");
let User = class User {
    id;
    email;
    profileImage;
    name;
    description;
    password;
    refreshTokenHash;
    polls;
    subs;
    choices;
    comments;
    votes;
};
exports.User = User;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], User.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', unique: true }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar' }),
    __metadata("design:type", Object)
], User.prototype, "profileImage", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar' }),
    __metadata("design:type", String)
], User.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], User.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", Object)
], User.prototype, "refreshTokenHash", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => poll_entity_1.Poll, (poll) => poll.user),
    __metadata("design:type", Array)
], User.prototype, "polls", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => sub_entity_1.Sub, (sub) => sub.user),
    __metadata("design:type", Array)
], User.prototype, "subs", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => choices_entity_1.Choice, (choice) => choice.user),
    __metadata("design:type", Array)
], User.prototype, "choices", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => comment_entity_1.Comment, (comment) => comment.user),
    __metadata("design:type", Array)
], User.prototype, "comments", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => vote_entity_1.Vote, (vote) => vote.user),
    __metadata("design:type", Array)
], User.prototype, "votes", void 0);
exports.User = User = __decorate([
    (0, typeorm_1.Entity)({ name: 'users' })
], User);
//# sourceMappingURL=user.entity.js.map