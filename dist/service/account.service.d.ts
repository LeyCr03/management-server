import { Repository } from "typeorm";
import { Account } from "src/entity/account.entity";
import { CreateAccountDto } from "src/dto/account.dto";
import { Status } from "src/types";
import { EntryService } from "./entry.service";
import { PaymentService } from "./payment.service";
import { Entry } from "src/entity/entry.entity";
export declare class AccountService {
    private readonly accountRepository;
    private readonly entryService;
    private readonly paymentService;
    private readonly logger;
    constructor(accountRepository: Repository<Account>, entryService: EntryService, paymentService: PaymentService);
    createAccount(createAccountDto: CreateAccountDto): Promise<Account>;
    findById(id: string): Promise<Account | null>;
    findByName(name: string): Promise<Account | null>;
    deleteAccount(id: string): Promise<{
        message: string;
    }>;
    updateAccount(id: string, name?: string): Promise<{
        message: string;
    }>;
    getLastPayment(accountId: string): Promise<Date>;
    getLastEntry(accountId: string): Promise<Date>;
    getEntriesAfterLastPayment(accountId: string): Promise<Entry[]>;
    getAccountFrequency(accountId: string): Promise<number>;
    getFilteredAccounts(search?: string, status?: Status, page?: number, limit?: number): Promise<{
        accounts: Account[];
        total: number;
    }>;
    getAllAccountsByRegistration(page?: number, limit?: number): Promise<{
        accounts: Account[];
        total: number;
    }>;
    getAllAccountsByLastPayment(): Promise<{
        accounts: Account[];
        total: number;
    }>;
    getAllAccountsByLastEntry(page?: number, limit?: number): Promise<{
        accounts: Account[];
        total: number;
    }>;
    getSuspensionStatus(accountId: string): Promise<{
        suspensionRisk: boolean;
        daysSinceLastPayment: number | null;
    }>;
    calculateAccountRevenue(accountId: string, pricePerEntry: number, subscriptionPrice: number): Promise<number>;
    calculateTotalRevenue(pricePerEntry: number, subscriptionPrice: number): Promise<number>;
    suspendAccounts(): Promise<void>;
    reportSuspensionRisks(): Promise<Account[]>;
    getSexMetrics(): Promise<{
        females: number;
        males: number;
    }>;
    getAgeMetrics(): Promise<{
        '18-25': number;
        '25-35': number;
        '35-45': number;
        '45-70': number;
    }>;
    getAllMonthNewCustomers(): Promise<{
        date: Date;
        accounts: number;
    }[]>;
    getAllNewCustomers(): Promise<number>;
    getAllActiveAccounts(): Promise<number>;
}
