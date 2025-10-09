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
exports.EntryService = void 0;
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const common_1 = require("@nestjs/common");
const account_entity_1 = require("../entity/account.entity");
const entry_entity_1 = require("../entity/entry.entity");
let EntryService = class EntryService {
    entryRepository;
    accountRepository;
    constructor(entryRepository, accountRepository) {
        this.entryRepository = entryRepository;
        this.accountRepository = accountRepository;
    }
    async createEntry(accountId) {
        const account = await this.accountRepository.findOne({ where: { id: accountId } });
        if (!account) {
            throw new common_1.NotFoundException('Account not found');
        }
        const entry = await this.entryRepository.create({
            accountId,
            account
        });
        const savedEntry = await this.entryRepository.save(entry);
        return savedEntry;
    }
    async findById(id) {
        return this.entryRepository.findOne({ where: { id } });
    }
    async deleteEntry(id) {
        const entry = await this.entryRepository.findOne({ where: { id } });
        if (!entry) {
            throw new common_1.NotFoundException('Entry with ID ${id} not found.');
        }
        await this.entryRepository.remove(entry);
        return { message: 'Entry deleted Succsessfully' };
    }
    async getAllMonthlyEntries() {
        const currentDate = new Date();
        const lastMonthDate = new Date(currentDate);
        lastMonthDate.setMonth(lastMonthDate.getMonth() - 1);
        const allEntries = await this.entryRepository.find({
            where: {
                registered_at: (0, typeorm_2.Between)(lastMonthDate, currentDate),
            },
            order: {
                registered_at: 'ASC',
            },
        });
        const groupedEntries = {};
        for (const entry of allEntries) {
            const entryDate = new Date(entry.registered_at.toDateString());
            const dateString = entryDate.toISOString().slice(0, 10);
            if (groupedEntries[dateString]) {
                groupedEntries[dateString].entries++;
            }
            else {
                groupedEntries[dateString] = {
                    date: entryDate,
                    entries: 1,
                };
            }
        }
        return Object.values(groupedEntries);
    }
    async getAllEntriesSinceLastMonths() {
        const currentDate = new Date();
        const monthsBefore = new Date();
        monthsBefore.setMonth(monthsBefore.getMonth() - 3);
        const entries = await this.entryRepository.count({
            where: {
                registered_at: (0, typeorm_2.MoreThanOrEqual)(monthsBefore),
            },
        });
        return entries;
    }
    async getAllEntries() {
        const entries = await this.entryRepository.find();
        return entries;
    }
    async getLastEntry(accountId) {
        const lastEntry = await this.entryRepository
            .createQueryBuilder('entry')
            .where('entry.accountId = :accountId', { accountId })
            .orderBy('entry.registered_at', 'DESC')
            .getOne();
        if (!lastEntry) {
            throw new common_1.NotFoundException(`No entries registered for account with id ${accountId}`);
        }
        return lastEntry.registered_at;
    }
};
exports.EntryService = EntryService;
exports.EntryService = EntryService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(entry_entity_1.Entry)),
    __param(1, (0, typeorm_1.InjectRepository)(account_entity_1.Account)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], EntryService);
//# sourceMappingURL=entry.service.js.map