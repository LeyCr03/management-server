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
        console.log({ createAccountDto });
        const account = await this.accountRepository.create(createAccountDto);
        console.log({ account });
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
    async updateAccount(id, name) {
        const account = await this.findById(id);
        if (!account) {
            throw new common_1.NotFoundException('Account with ID ${id} not found.');
        }
        await this.accountRepository.update(id, { name });
        return { message: ' Account Updated' };
    }
    async getLastPayment(accountId) {
        const account = await this.findById(accountId);
        if (!account) {
            throw new common_1.NotFoundException('Account with ID ${id} not found.');
        }
        const last_payment = account.payments[0].registered_at;
        return last_payment;
    }
    async getLastEntry(accountId) {
        const account = await this.findById(accountId);
        if (!account) {
            throw new common_1.NotFoundException('Account with ID ${id} not found.');
        }
        const last_entry = account.entries[0].registered_at;
        return last_entry;
    }
    async getEntriesAfterLastPayment(accountId) {
        const account = await this.findById(accountId);
        if (!account) {
            throw new common_1.NotFoundException('Account with ID ${id} not found.');
        }
        const last_payment = await this.getLastPayment(accountId);
        const entriesAfterLastPayment = account.entries.filter(entry => entry.registered_at > (last_payment ? last_payment : new Date(0)));
        return entriesAfterLastPayment;
    }
    async getFilteredAccounts(search, status, page = 1, limit = 10) {
        const where = {};
        if (status) {
            where.status = status;
        }
        if (search) {
            where.name = (0, typeorm_2.ILike)(`%${search}%`);
        }
        const findOptions = {
            where,
            skip: (page - 1) * limit,
            take: limit,
        };
        const [accounts, total] = await this.accountRepository.findAndCount(findOptions);
        return { accounts, total };
    }
    async getAllAccountsByRegistration() {
        const page = 1;
        const limit = 10;
        const skip = (page - 1) * limit;
        const accounts = await this.accountRepository.find();
        accounts.sort((a, b) => b.registered_at.getTime() - a.registered_at.getTime());
        const total = accounts.length;
        return { accounts, total };
    }
    async getAllAccountsByLastPayment() {
        const page = 1;
        const limit = 10;
        const skip = (page - 1) * limit;
        const [accounts, total] = await this.accountRepository.createQueryBuilder('account')
            .leftJoinAndSelect('account.payments', 'payment')
            .orderBy('payment.registered_at', 'DESC')
            .skip(skip)
            .take(limit)
            .getManyAndCount();
        return { accounts, total };
    }
    async getAllAccountsByLastEntry(page = 1, limit = 10) {
        const skip = (page - 1) * limit;
        const [accounts, total] = await this.accountRepository.createQueryBuilder('account')
            .leftJoinAndSelect('account.entries', 'entry')
            .orderBy('entry.registered_at', 'DESC')
            .skip(skip)
            .take(limit)
            .getManyAndCount();
        return { accounts, total };
    }
    async getAccountFrequency(accountId) {
        const frequency = await this.getEntriesAfterLastPayment(accountId);
        return frequency.length;
    }
    async getSuspensionStatus(accountId) {
        const last_payment = await this.getLastPayment(accountId);
        const currentDate = new Date();
        const daysSinceLastPayment = last_payment ? Math.floor((currentDate.getTime() - last_payment.getTime()) / (1000 * 3600 * 24)) : null;
        const suspensionThresholdDays = 30;
        const suspensionRisk = daysSinceLastPayment === null || daysSinceLastPayment > suspensionThresholdDays;
        return { suspensionRisk, daysSinceLastPayment };
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
                if (!account.payments || account.payments.length === 0) {
                    account.status = types_1.Status.SUSPENDED;
                    await this.accountRepository.save(account);
                    this.logger.log(`Account ${account.id} suspended due to no payments.`);
                    continue;
                }
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
    async reportSuspensionRisks() {
        const accounts = await this.accountRepository.find({
            where: { status: types_1.Status.ACTIVE },
            relations: ['payments'],
        });
        const riskedAccounts = [];
        for (const account of accounts) {
            if (!account.payments || account.payments.length === 0) {
                account.status = types_1.Status.SUSPENDED;
                await this.accountRepository.save(account);
                continue;
            }
            const lastPayment = account.payments.sort((a, b) => b.registered_at.getTime() - a.registered_at.getTime())[0];
            const currentDate = new Date();
            const suspendDate = new Date(lastPayment.registered_at);
            suspendDate.setMonth(suspendDate.getMonth() + 1);
            const timeDiff = suspendDate.getTime() - currentDate.getTime();
            const dayDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
            if (dayDiff <= 1) {
                riskedAccounts.push(account);
            }
        }
        return riskedAccounts;
    }
    async getSexMetrics() {
        const females = await this.accountRepository.count({
            where: { sex: types_1.Sex.FEMALE }
        });
        const males = await this.accountRepository.count({
            where: { sex: types_1.Sex.MALE }
        });
        return { females, males };
    }
    async getAgeMetrics() {
        const age18to25 = await this.accountRepository.count({
            where: { age: (0, typeorm_2.Between)(18, 25) },
        });
        const age25to35 = await this.accountRepository.count({
            where: { age: (0, typeorm_2.Between)(26, 35) },
        });
        const age35to45 = await this.accountRepository.count({
            where: { age: (0, typeorm_2.Between)(36, 45) },
        });
        const age45to70 = await this.accountRepository.count({
            where: { age: (0, typeorm_2.Between)(46, 70) },
        });
        return {
            '18-25': age18to25,
            '25-35': age25to35,
            '35-45': age35to45,
            '45-70': age45to70,
        };
    }
    async getAllMonthNewCustomers() {
        const currentDate = new Date();
        const monthDate = new Date(currentDate);
        monthDate.setMonth(monthDate.getMonth() - 3);
        const allNewAccounts = await this.accountRepository.find({
            where: {
                registered_at: (0, typeorm_2.Between)(monthDate, currentDate),
            },
            order: {
                registered_at: 'ASC',
            },
        });
        const groupedAccounts = {};
        for (const account of allNewAccounts) {
            const date = new Date(account.registered_at.toDateString());
            const dateString = date.toISOString().slice(0, 10);
            if (groupedAccounts[dateString]) {
                groupedAccounts[dateString].accounts++;
            }
            else {
                groupedAccounts[dateString] = {
                    date: date,
                    accounts: 1,
                };
            }
        }
        return Object.values(groupedAccounts);
    }
    async getAllNewCustomers() {
        const currentDate = new Date();
        const monthsBefore = new Date();
        monthsBefore.setMonth(monthsBefore.getMonth() - 3);
        const accounts = await this.accountRepository.count({
            where: {
                registered_at: (0, typeorm_2.MoreThanOrEqual)(monthsBefore),
            },
        });
        return accounts;
    }
    async getAllActiveAccounts() {
        const accounts = await this.accountRepository.count({
            where: { status: types_1.Status.ACTIVE }
        });
        return accounts;
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