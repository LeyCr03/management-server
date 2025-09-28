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
    async createEntry(accountId, registered_at) {
        const account = await this.accountRepository.findOne({ where: { id: accountId } });
        if (!account) {
            throw new common_1.NotFoundException('Account not found');
        }
        const entry = await this.entryRepository.create({
            registered_at,
            accountId,
            account
        });
        const savedEntry = await this.entryRepository.save(entry);
        return savedEntry;
    }
    async findById(id) {
        return this.entryRepository.findOne({ where: { id } });
    }
    async findAllByDate(date) {
        return this.entryRepository.find({ where: { registered_at: date } });
    }
    async deleteEntry(id) {
        const entry = await this.entryRepository.findOne({ where: { id } });
        if (!entry) {
            throw new common_1.NotFoundException('Entry with ID ${id} not found.');
        }
        await this.entryRepository.remove(entry);
        return { message: 'Entry deleted Succsessfully' };
    }
    async getAllAccountsEntries(accountId) {
        const account = await this.accountRepository.findOne({ where: { id: accountId } });
        if (!account) {
            throw new common_1.NotFoundException('Account not found');
        }
        return this.entryRepository.find({ where: { accountId } });
    }
    async getAllMonthlyEntries() {
        const currentDate = new Date();
        const lastMonthDate = new Date(currentDate);
        lastMonthDate.setMonth(lastMonthDate.getMonth() - 1);
        const entries = await this.entryRepository.find({
            where: {
                registered_at: (0, typeorm_2.Between)(currentDate, lastMonthDate),
            },
        });
        return entries;
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