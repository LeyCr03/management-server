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
exports.Account = void 0;
const typeorm_1 = require("typeorm");
const types_1 = require("../types");
const payment_entity_1 = require("./payment.entity");
const entry_entity_1 = require("./entry.entity");
let Account = class Account {
    id;
    birth;
    registered_at;
    age;
    name;
    sex;
    status;
    payments;
    entries;
};
exports.Account = Account;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Account.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date' }),
    __metadata("design:type", Date)
], Account.prototype, "birth", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: 'timestamp' }),
    __metadata("design:type", Date)
], Account.prototype, "registered_at", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int' }),
    __metadata("design:type", Number)
], Account.prototype, "age", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255 }),
    __metadata("design:type", String)
], Account.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: types_1.Sex }),
    __metadata("design:type", String)
], Account.prototype, "sex", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: types_1.Status, default: types_1.Status.SUSPENDED }),
    __metadata("design:type", String)
], Account.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => payment_entity_1.Payment, (payment) => payment.account),
    __metadata("design:type", Array)
], Account.prototype, "payments", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => entry_entity_1.Entry, (entry) => entry.account),
    __metadata("design:type", Array)
], Account.prototype, "entries", void 0);
exports.Account = Account = __decorate([
    (0, typeorm_1.Entity)({ name: 'account' })
], Account);
//# sourceMappingURL=account.entity.js.map