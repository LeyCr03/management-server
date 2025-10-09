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
const entry_service_1 = require("./entry.service");
const payment_service_1 = require("./payment.service");
let AccountService = class AccountService {
    accountRepository;
    entryService;
    paymentService;
    logger;
    constructor(accountRepository, entryService, paymentService) {
        this.accountRepository = accountRepository;
        this.entryService = entryService;
        this.paymentService = paymentService;
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
        const lastPaymentDate = await this.paymentService.getLastPayment(accountId);
        return lastPaymentDate;
    }
    async getLastEntry(accountId) {
        const account = await this.findById(accountId);
        if (!account) {
            throw new common_1.NotFoundException('Account with ID ${id} not found.');
        }
        const lastEntryDate = await this.entryService.getLastEntry(accountId);
        return lastEntryDate;
    }
    async getEntriesAfterLastPayment(accountId) {
        const lastPaymentDate = await this.getLastPayment(accountId);
        const account = await this.accountRepository.findOne({
            where: { id: accountId },
            relations: ['entries'],
        });
        if (!account) {
            throw new common_1.NotFoundException(`Account with ID ${accountId} not found.`);
        }
        let entries = account.entries;
        if (lastPaymentDate) {
            entries = account.entries.filter((entry) => entry.registered_at > lastPaymentDate);
        }
        return entries;
    }
    async getAccountFrequency(accountId) {
        const frequency = await this.getEntriesAfterLastPayment(accountId);
        return frequency.length;
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
    async getAllAccountsByRegistration(page = 1, limit = 10) {
        const skip = (page - 1) * limit;
        const [accounts, total] = await this.accountRepository.findAndCount({
            order: {
                registered_at: 'DESC',
            },
            skip: skip,
            take: limit,
        });
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
    async getSuspensionStatus(accountId) {
        const last_payment = await this.getLastPayment(accountId);
        const currentDate = new Date();
        const daysSinceLastPayment = last_payment ? Math.floor((currentDate.getTime() - last_payment.getTime()) / (1000 * 3600 * 24)) : null;
        const suspensionThresholdDays = 30;
        const suspensionRisk = daysSinceLastPayment === null || daysSinceLastPayment > suspensionThresholdDays;
        return { suspensionRisk, daysSinceLastPayment };
    }
    async calculateAccountRevenue(accountId, pricePerEntry, subscriptionPrice) {
        const last_payment = await this.getLastPayment(accountId);
        const entriesAfterLastPayment = await this.getEntriesAfterLastPayment(accountId);
        const revenue = (entriesAfterLastPayment.length * pricePerEntry) - subscriptionPrice;
        return revenue;
    }
    async calculateTotalRevenue(pricePerEntry, subscriptionPrice) {
        const accounts = await this.accountRepository.find({ relations: ['payments', 'entries'] });
        let totalRevenue = 0;
        for (const account of accounts) {
            const lastPayment = await this.getLastPayment(account.id);
            const entriesAfterLastPayment = await this.getEntriesAfterLastPayment(account.id);
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
        const currentDate = new Date();
        const riskedAccounts = [];
        const accounts = await this.accountRepository
            .createQueryBuilder('account')
            .leftJoinAndSelect('account.payments', 'payment', 'payment.registered_at = (SELECT MAX(registered_at) FROM payments WHERE accountId = account.id)')
            .where('account.status = :status', { status: types_1.Status.ACTIVE })
            .andWhere('(payment.registered_at IS NULL OR payment.registered_at <= :suspensionThreshold)', { suspensionThreshold: new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, currentDate.getDate()) })
            .getMany();
        for (const account of accounts) {
            if (!account.payments || account.payments.length === 0) {
                continue;
            }
            const lastPayment = await this.getLastPayment(account.id);
            const suspendDate = new Date(lastPayment);
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
    __metadata("design:paramtypes", [typeorm_2.Repository,
        entry_service_1.EntryService,
        payment_service_1.PaymentService])
], AccountService);
//# sourceMappingURL=account.service.js.map