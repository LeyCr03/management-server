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
exports.AccountService = void 0;
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const common_1 = require("@nestjs/common");
const account_entity_1 = require("../entity/account.entity");
const types_1 = require("../types");
const schedule_1 = require("@nestjs/schedule");
let AccountService = class AccountService {
    accountRepository;
    logger;
    constructor(accountRepository) {
        this.accountRepository = accountRepository;
        this.logger = new common_1.Logger("Account");
    }
    async createAccount(createAccountDto) {
        const account = await this.accountRepository.create(createAccountDto);
        const savedAccount = await this.accountRepository.save(account);
        return savedAccount;
    }
    async findById(id) {
        return this.accountRepository.findOne({ where: { id } });
    }
    async findByName(name) {
        return this.accountRepository.findOne({ where: { name } });
    }
    async deleteAccount(id) {
        const account = await this.accountRepository.findOne({ where: { id } });
        if (!account) {
            throw new common_1.NotFoundException('Account with ID ${id} not found.');
        }
        await this.accountRepository.remove(account);
        return { message: ' Account deleted Succsessfully' };
    }
    async updateAccount(id, status) {
        const account = await this.findById(id);
        if (!account) {
            throw new common_1.NotFoundException('Account with ID ${id} not found.');
        }
        await this.accountRepository.update(id, { status });
        return { message: ' Account Updated' };
    }
    async getFilteredAccounts(sex, ageRange, status, page = 1, limit = 10) {
        const where = {};
        if (sex) {
            where.sex = sex;
        }
        if (status) {
            where.status = status;
        }
        if (ageRange) {
            const [minAge, maxAge] = ageRange.split('-').map(Number);
            where.age = (0, typeorm_2.Between)(minAge, maxAge);
        }
        const [accounts, total] = await this.accountRepository.findAndCount({
            where,
            skip: (page - 1) * limit,
            take: limit,
        });
        return { accounts, total };
    }
    async getAccountFrequencyAndSuspensionStatus(accountId) {
        const account = await this.accountRepository.findOne({
            where: { id: accountId },
            relations: ['payments', 'entries'],
        });
        if (!account) {
            throw new Error('Account not found');
        }
        const lastPayment = account.payments.sort((a, b) => b.registered_at.getTime() - a.registered_at.getTime())[0];
        const entriesAfterLastPayment = account.entries.filter(entry => entry.registered_at > (lastPayment ? lastPayment.registered_at : new Date(0)));
        const currentDate = new Date();
        const daysSinceLastPayment = lastPayment ? Math.floor((currentDate.getTime() - lastPayment.registered_at.getTime()) / (1000 * 3600 * 24)) : null;
        const suspensionThresholdDays = 30;
        const suspensionRisk = daysSinceLastPayment === null || daysSinceLastPayment > suspensionThresholdDays;
        return {
            frequency: entriesAfterLastPayment.length,
            suspensionRisk: suspensionRisk,
            daysSinceLastPayment: daysSinceLastPayment || null,
        };
    }
    async calculateAccountRevenue(accountId, pricePerEntry, subscriptionPrice) {
        const account = await this.accountRepository.findOne({
            where: { id: accountId },
            relations: ['payments', 'entries'],
        });
        if (!account) {
            throw new Error('Account not found');
        }
        const lastPayment = account.payments.sort((a, b) => b.registered_at.getTime() - a.registered_at.getTime())[0];
        const entriesAfterLastPayment = account.entries.filter(entry => entry.registered_at > (lastPayment ? lastPayment.registered_at : new Date(0)));
        const revenue = (entriesAfterLastPayment.length * pricePerEntry) - subscriptionPrice;
        return revenue;
    }
    async calculateTotalRevenue(pricePerEntry, subscriptionPrice) {
        const accounts = await this.accountRepository.find({ relations: ['payments', 'entries'] });
        let totalRevenue = 0;
        for (const account of accounts) {
            const lastPayment = account.payments.sort((a, b) => b.registered_at.getTime() - a.registered_at.getTime())[0];
            const entriesAfterLastPayment = account.entries.filter(entry => entry.registered_at > (lastPayment ? lastPayment.registered_at : new Date(0)));
            const accountRevenue = (entriesAfterLastPayment.length * pricePerEntry) - subscriptionPrice;
            totalRevenue += accountRevenue;
        }
        return totalRevenue;
    }
    async suspendAccounts() {
        this.logger.log('Starting daily account suspension check...');
        const accounts = await this.accountRepository.find({
            where: { status: types_1.Status.ACTIVE },
            relations: ['payments'],
        });
        for (const account of accounts) {
            try {
                const lastPayment = account.payments.sort((a, b) => b.registered_at.getTime() - a.registered_at.getTime())[0];
                if (!lastPayment) {
                    account.status = types_1.Status.SUSPENDED;
                    await this.accountRepository.save(account);
                    this.logger.log(`Account ${account.id} suspended due to no payments.`);
                    continue;
                }
                const currentDate = new Date();
                const suspendDate = new Date(lastPayment.registered_at);
                suspendDate.setMonth(suspendDate.getMonth() + 1);
                suspendDate.setDate(suspendDate.getDate() + 1);
                if (currentDate > suspendDate) {
                    account.status = types_1.Status.SUSPENDED;
                    await this.accountRepository.save(account);
                    this.logger.log(`Account ${account.id} suspended due to overdue payment.`);
                }
            }
            catch (error) {
                this.logger.error(`Failed to process account ${account.id}: ${error.message}`, error.stack);
            }
        }
        this.logger.log('Account suspension check complete.');
    }
};
exports.AccountService = AccountService;
__decorate([
    (0, schedule_1.Cron)(schedule_1.CronExpression.EVERY_DAY_AT_MIDNIGHT),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AccountService.prototype, "suspendAccounts", null);
exports.AccountService = AccountService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(account_entity_1.Account)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], AccountService);
//# sourceMappingURL=account.service.js.map