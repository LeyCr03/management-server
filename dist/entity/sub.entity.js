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
exports.Sub = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("./user.entity");
const poll_entity_1 = require("./poll.entity");
let Sub = class Sub {
    id;
    subscribed_at;
    userId;
    pollId;
    user;
    poll;
};
exports.Sub = Sub;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Sub.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: 'timestamp' }),
    __metadata("design:type", Date)
], Sub.prototype, "subscribed_at", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'uuid' }),
    __metadata("design:type", String)
], Sub.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'uuid' }),
    __metadata("design:type", String)
], Sub.prototype, "pollId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, user => user.subs, { onDelete: 'CASCADE' }),
    __metadata("design:type", user_entity_1.User)
], Sub.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => poll_entity_1.Poll, poll => poll.subs, { onDelete: 'CASCADE' }),
    __metadata("design:type", poll_entity_1.Poll)
], Sub.prototype, "poll", void 0);
exports.Sub = Sub = __decorate([
    (0, typeorm_1.Entity)('subs')
], Sub);
//# sourceMappingURL=sub.entity.js.map