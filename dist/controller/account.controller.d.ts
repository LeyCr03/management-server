import { CreateAccountDto } from "src/dto/account.dto";
import { Account } from "src/entity/account.entity";
import { AccountService } from "src/service/account.service";
import { AgeRange, Sex, Status } from "src/types";
export declare class AccountController {
    private readonly accountService;
    constructor(accountService: AccountService);
    delete(id: string): Promise<{
        message: string;
    }>;
    update(id: string, status: Status): Promise<{
        message: string;
    }>;
    create(createAccountDto: CreateAccountDto): Promise<Account>;
    getAccountById(id: string): Promise<Account | null>;
    getAccountByName(name: string): Promise<Account | null>;
    getFilteredAccounts(sex?: Sex, ageRange?: AgeRange, status?: Status, page?: number, limit?: number): Promise<{
        accounts: Account[];
        total: number;
    }>;
    getAccountSuspensionMetrics(id: string): Promise<{
        frequency: number;
        suspensionRisk: boolean;
        daysSinceLastPayment?: number | null;
    }>;
    getAccountRevenue(id: string, pricePerEntry: number, subscriptionPrice: number): Promise<number>;
    getRevenue(pricePerEntry: number, subscriptionPrice: number): Promise<number>;
}
