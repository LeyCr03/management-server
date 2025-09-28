import { Repository } from "typeorm";
import { Account } from "src/entity/account.entity";
import { Payment } from "src/entity/payment.entity";
export declare class PaymentService {
    private readonly accountRepository;
    private readonly paymentRepository;
    constructor(accountRepository: Repository<Account>, paymentRepository: Repository<Payment>);
    createPayment(accountId: string, registered_at: Date): Promise<Payment>;
    findById(id: string): Promise<Payment | null>;
    findAllByDate(date: Date): Promise<Payment[] | null>;
    deletePayment(id: string): Promise<{
        message: string;
    }>;
    getAllAccountsPayments(accountId: string): Promise<Payment[]>;
    getAllMonthlyPayments(): Promise<Payment[]>;
}
