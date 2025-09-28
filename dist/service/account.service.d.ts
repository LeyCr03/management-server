import { Repository } from "typeorm";
import { Account } from "src/entity/account.entity";
import { CreateAccountDto } from "src/dto/account.dto";
import { AgeRange, Sex, Status } from "src/types";
export declare class AccountService {
    private readonly accountRepository;
    private readonly logger;
    constructor(accountRepository: Repository<Account>);
    createAccount(createAccountDto: CreateAccountDto): Promise<Account>;
    findById(id: string): Promise<Account | null>;
    findByName(name: string): Promise<Account | null>;
    deleteAccount(id: string): Promise<{
        message: string;
    }>;
    updateAccount(id: string, status: Status): Promise<{
        message: string;
    }>;
    getFilteredAccounts(sex?: Sex, ageRange?: AgeRange, status?: Status, page?: number, limit?: number): Promise<{
        accounts: Account[];
        total: number;
    }>;
    getAccountFrequencyAndSuspensionStatus(accountId: string): Promise<{
        frequency: number;
        suspensionRisk: boolean;
        daysSinceLastPayment?: number | null;
    }>;
    calculateAccountRevenue(accountId: string, pricePerEntry: number, subscriptionPrice: number): Promise<number>;
    calculateTotalRevenue(pricePerEntry: number, subscriptionPrice: number): Promise<number>;
    suspendAccounts(): Promise<void>;
}
