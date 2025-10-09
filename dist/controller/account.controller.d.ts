import { CreateAccountDto } from "src/dto/account.dto";
import { Account } from "src/entity/account.entity";
import { AccountService } from "src/service/account.service";
import { Status } from "src/types";
export declare class AccountController {
    private readonly accountService;
    constructor(accountService: AccountService);
    delete(id: string): Promise<{
        message: string;
    }>;
    update(id: string, name: string): Promise<{
        message: string;
    }>;
    create(createAccountDto: CreateAccountDto): Promise<Account>;
    getAccountById(id: string): Promise<Account | null>;
    getAccountByName(name: string): Promise<Account | null>;
    getAccountLastPayment(id: string): Promise<Date>;
    getAccountLastEntry(id: string): Promise<Date>;
    getAllAccountsByPayment(): Promise<{
        accounts: Account[];
        total: number;
    }>;
    getAllAccountsByEntry(): Promise<{
        accounts: Account[];
        total: number;
    }>;
    getAllAccountsByRegistration(page: number, limit: number): Promise<{
        accounts: Account[];
        total: number;
    }>;
    getFilteredAccounts(search?: string, status?: Status): Promise<{
        accounts: Account[];
        total: number;
    }>;
    getAccountRevenue(id: string, pricePerEntry: number, subscriptionPrice: number): Promise<number>;
    getRevenue(pricePerEntry: number, subscriptionPrice: number): Promise<number>;
    getSuspension(id: string): Promise<{
        suspensionRisk: boolean;
        daysSinceLastPayment: number | null;
    }>;
    getRiskReport(): Promise<Account[]>;
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
    getMonthNewCustomers(): Promise<{
        date: Date;
        accounts: number;
    }[]>;
    getNewCustomers(): Promise<number>;
    getActiveAccounts(): Promise<number>;
    getEntriesAfterLastPayment(id: string): Promise<import("../entity/entry.entity").Entry[]>;
    getFreqency(id: string): Promise<number>;
}
