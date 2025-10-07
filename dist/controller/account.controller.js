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
    async update(id, name) {
        return this.accountService.updateAccount(id, name);
    }
    async create(createAccountDto) {
        return await this.accountService.createAccount(createAccountDto);
    }
    async getAccountById(id) {
        return this.accountService.findById(id);
    }
    async getAccountByName(name) {
        return this.accountService.findByName(name);
    }
    async getAccountRevenue(id, pricePerEntry, subscriptionPrice) {
        return this.accountService.calculateAccountRevenue(id, pricePerEntry, subscriptionPrice);
    }
    async getAccountLastPayment(id) {
        return this.accountService.getLastPayment(id);
    }
    async getAccountLastEntry(id) {
        return this.accountService.getLastEntry(id);
    }
    async getAccountEntiesAfterLastPayment(id) {
        return this.accountService.getEntriesAfterLastPayment(id);
    }
    async getAllAccounts() {
        return this.accountService.getAllAccountsByLastPayment();
    }
    async getAllAccountsByRegistration() {
        return this.accountService.getAllAccountsByRegistration();
    }
    async getFilteredAccounts(search, status) {
        return this.accountService.getFilteredAccounts(search, status);
    }
    async getRevenue(pricePerEntry, subscriptionPrice) {
        return this.accountService.calculateTotalRevenue(pricePerEntry, subscriptionPrice);
    }
    async getFrequency(id) {
        return this.accountService.getAccountFrequency(id);
    }
    async getSuspension(id) {
        return this.accountService.getSuspensionStatus(id);
    }
    async getRiskReport() {
        return this.accountService.reportSuspensionRisks();
    }
    async getSexMetrics() {
        return this.accountService.getSexMetrics();
    }
    async getAgeMetrics() {
        return this.accountService.getAgeMetrics();
    }
    async getMonthNewCustomers() {
        return this.accountService.getAllMonthNewCustomers();
    }
    async getNewCustomers() {
        return this.accountService.getAllNewCustomers();
    }
    async getActiveAccounts() {
        return this.accountService.getAllActiveAccounts();
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
    (0, common_1.Post)(),
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
    (0, common_1.Get)('revenue/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Query)('pricePerEntry')),
    __param(2, (0, common_1.Query)('subscriptionPrice')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, Number]),
    __metadata("design:returntype", Promise)
], AccountController.prototype, "getAccountRevenue", null);
__decorate([
    (0, common_1.Get)('last-payment/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AccountController.prototype, "getAccountLastPayment", null);
__decorate([
    (0, common_1.Get)('last-entry/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AccountController.prototype, "getAccountLastEntry", null);
__decorate([
    (0, common_1.Get)('entries/afterLastPayment/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AccountController.prototype, "getAccountEntiesAfterLastPayment", null);
__decorate([
    (0, common_1.Get)('by-last-payment'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AccountController.prototype, "getAllAccounts", null);
__decorate([
    (0, common_1.Get)('by/registration'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AccountController.prototype, "getAllAccountsByRegistration", null);
__decorate([
    (0, common_1.Get)('by-filter'),
    __param(0, (0, common_1.Query)('search')),
    __param(1, (0, common_1.Query)('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], AccountController.prototype, "getFilteredAccounts", null);
__decorate([
    (0, common_1.Get)('revenue/total'),
    __param(0, (0, common_1.Query)('pricePerEntry')),
    __param(1, (0, common_1.Query)('subscriptionPrice')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], AccountController.prototype, "getRevenue", null);
__decorate([
    (0, common_1.Get)('frequency/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AccountController.prototype, "getFrequency", null);
__decorate([
    (0, common_1.Get)('suspension-status/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AccountController.prototype, "getSuspension", null);
__decorate([
    (0, common_1.Get)('suspension-report'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AccountController.prototype, "getRiskReport", null);
__decorate([
    (0, common_1.Get)('sex/metrics'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AccountController.prototype, "getSexMetrics", null);
__decorate([
    (0, common_1.Get)('age/metrics'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AccountController.prototype, "getAgeMetrics", null);
__decorate([
    (0, common_1.Get)('month-new-customers'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AccountController.prototype, "getMonthNewCustomers", null);
__decorate([
    (0, common_1.Get)('new-customers'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AccountController.prototype, "getNewCustomers", null);
__decorate([
    (0, common_1.Get)('active-accounts'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AccountController.prototype, "getActiveAccounts", null);
exports.AccountController = AccountController = __decorate([
    (0, common_1.Controller)('api/accounts'),
    __metadata("design:paramtypes", [account_service_1.AccountService])
], AccountController);
//# sourceMappingURL=account.controller.js.map