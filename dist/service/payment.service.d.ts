import { Repository } from "typeorm";
import { Account } from "src/entity/account.entity";
import { Payment } from "src/entity/payment.entity";
export declare class PaymentService {
    private readonly accountRepository;
    private readonly paymentRepository;
    constructor(accountRepository: Repository<Account>, paymentRepository: Repository<Payment>);
    createPayment(accountId: string, registered_at: Date): Promise<Payment>;
    findById(id: string): Promise<Payment | null>;
    deletePayment(id: string): Promise<{
        message: string;
    }>;
    getMonthlyPayments(): Promise<number>;
    getAllPayments(): Promise<Payment[]>;
    getRevenueData(pricePerEntry: number): Promise<{
        date: Date;
        revenue: number;
    }[]>;
    getLastPayment(accountId: string): Promise<Date>;
}
