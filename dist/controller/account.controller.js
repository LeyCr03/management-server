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
exports.AccountController = void 0;
const common_1 = require("@nestjs/common");
const account_dto_1 = require("../dto/account.dto");
const account_service_1 = require("../service/account.service");
const types_1 = require("../types");
let AccountController = class AccountController {
    accountService;
    constructor(accountService) {
        this.accountService = accountService;
    }
    async delete(id) {
        return this.accountService.deleteAccount(id);
    }
    async update(id, status) {
        return this.accountService.updateAccount(id, status);
    }
    async create(createAccountDto) {
        return this.accountService.createAccount(createAccountDto);
    }
    async getAccountById(id) {
        return this.accountService.findById(id);
    }
    async getAccountByName(name) {
        return this.accountService.findByName(name);
    }
    async getFilteredAccounts(sex, ageRange, status, page = 1, limit = 10) {
        return this.accountService.getFilteredAccounts(sex, ageRange, status, page, limit);
    }
    async getAccountSuspensionMetrics(id) {
        return this.accountService.getAccountFrequencyAndSuspensionStatus(id);
    }
    async getAccountRevenue(id, pricePerEntry, subscriptionPrice) {
        return this.accountService.calculateAccountRevenue(id, pricePerEntry, subscriptionPrice);
    }
    async getRevenue(pricePerEntry, subscriptionPrice) {
        return this.accountService.calculateTotalRevenue(pricePerEntry, subscriptionPrice);
    }
};
exports.AccountController = AccountController;
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AccountController.prototype, "delete", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], AccountController.prototype, "update", null);
__decorate([
    (0, common_1.Put)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [account_dto_1.CreateAccountDto]),
    __metadata("design:returntype", Promise)
], AccountController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AccountController.prototype, "getAccountById", null);
__decorate([
    (0, common_1.Get)('by-name/:name'),
    __param(0, (0, common_1.Param)('name')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AccountController.prototype, "getAccountByName", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('sex', new common_1.ParseEnumPipe(types_1.Sex, { optional: true }))),
    __param(1, (0, common_1.Query)('ageRange')),
    __param(2, (0, common_1.Query)('status', new common_1.ParseEnumPipe(types_1.Status, { optional: true }))),
    __param(3, (0, common_1.Query)('page', new common_1.DefaultValuePipe(1), common_1.ParseIntPipe)),
    __param(4, (0, common_1.Query)('limit', new common_1.DefaultValuePipe(10), common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, Number, Number]),
    __metadata("design:returntype", Promise)
], AccountController.prototype, "getFilteredAccounts", null);
__decorate([
    (0, common_1.Get)('suspension-metrics/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AccountController.prototype, "getAccountSuspensionMetrics", null);
__decorate([
    (0, common_1.Get)('revenue/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Query)('pricePerEntry')),
    __param(2, (0, common_1.Query)('subscriptionPrice')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, Number]),
    __metadata("design:returntype", Promise)
], AccountController.prototype, "getAccountRevenue", null);
__decorate([
    (0, common_1.Get)('revenue/total'),
    __param(0, (0, common_1.Query)('pricePerEntry')),
    __param(1, (0, common_1.Query)('subscriptionPrice')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], AccountController.prototype, "getRevenue", null);
exports.AccountController = AccountController = __decorate([
    (0, common_1.Controller)('api/accounts'),
    __metadata("design:paramtypes", [account_service_1.AccountService])
], AccountController);
//# sourceMappingURL=account.controller.js.map