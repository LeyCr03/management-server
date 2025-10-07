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
    getAccountRevenue(id: string, pricePerEntry: number, subscriptionPrice: number): Promise<number>;
    getAccountLastPayment(id: string): Promise<Date>;
    getAccountLastEntry(id: string): Promise<Date>;
    getAccountEntiesAfterLastPayment(id: string): Promise<import("../entity/entry.entity").Entry[]>;
    getAllAccounts(): Promise<{
        accounts: Account[];
        total: number;
    }>;
    getAllAccountsByRegistration(): Promise<{
        accounts: Account[];
        total: number;
    }>;
    getFilteredAccounts(search?: string, status?: Status): Promise<{
        accounts: Account[];
        total: number;
    }>;
    getRevenue(pricePerEntry: number, subscriptionPrice: number): Promise<number>;
    getFrequency(id: string): Promise<number>;
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
}
