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
exports.PaymentService = void 0;
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const common_1 = require("@nestjs/common");
const account_entity_1 = require("../entity/account.entity");
const payment_entity_1 = require("../entity/payment.entity");
const types_1 = require("../types");
let PaymentService = class PaymentService {
    accountRepository;
    paymentRepository;
    constructor(accountRepository, paymentRepository) {
        this.accountRepository = accountRepository;
        this.paymentRepository = paymentRepository;
    }
    async createPayment(accountId, registered_at) {
        const account = await this.accountRepository.findOne({ where: { id: accountId } });
        if (!account) {
            throw new common_1.NotFoundException('Account not found');
        }
        const payment = await this.paymentRepository.create({
            accountId,
            account,
            registered_at
        });
        const savedpayment = await this.paymentRepository.save(payment);
        await this.accountRepository.update(accountId, { status: types_1.Status.ACTIVE });
        return savedpayment;
    }
    async findById(id) {
        return this.paymentRepository.findOne({ where: { id } });
    }
    async deletePayment(id) {
        const payment = await this.paymentRepository.findOne({ where: { id } });
        if (!payment) {
            throw new common_1.NotFoundException('Payment with ID ${id} not found.');
        }
        await this.paymentRepository.remove(payment);
        return { message: ' Account deleted Succsessfully' };
    }
    async getMonthlyPayments() {
        const currentDate = new Date();
        const lastMonthDate = new Date(currentDate);
        lastMonthDate.setMonth(lastMonthDate.getMonth() - 1);
        const payments = await this.paymentRepository.count({
            where: {
                registered_at: (0, typeorm_2.Between)(currentDate, lastMonthDate),
            },
        });
        return payments;
    }
    async getAllPayments() {
        const payments = await this.paymentRepository.find();
        return payments;
    }
    async getRevenueData(pricePerEntry) {
        const currentDate = new Date();
        const monthDate = new Date(currentDate);
        monthDate.setMonth(monthDate.getMonth() - 1);
        const allPayments = await this.paymentRepository.find({
            where: {
                registered_at: (0, typeorm_2.Between)(monthDate, currentDate),
            },
            order: {
                registered_at: 'ASC',
            },
        });
        const groupedPayments = {};
        for (const payment of allPayments) {
            const date = new Date(payment.registered_at.toDateString());
            const dateString = date.toISOString().slice(0, 10);
            if (groupedPayments[dateString]) {
                groupedPayments[dateString].revenue += pricePerEntry;
            }
            else {
                groupedPayments[dateString] = {
                    date: date,
                    revenue: pricePerEntry,
                };
            }
        }
        return Object.values(groupedPayments);
    }
    async getLastPayment(accountId) {
        const lastPayment = await this.paymentRepository
            .createQueryBuilder('payment')
            .where('payment.accountId = :accountId', { accountId })
            .orderBy('payment.registered_at', 'DESC')
            .getOne();
        if (!lastPayment) {
            throw new common_1.NotFoundException(`No payments registered for account with id ${accountId}`);
        }
        return lastPayment.registered_at;
    }
};
exports.PaymentService = PaymentService;
exports.PaymentService = PaymentService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(account_entity_1.Account)),
    __param(1, (0, typeorm_1.InjectRepository)(payment_entity_1.Payment)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], PaymentService);
//# sourceMappingURL=payment.service.js.map