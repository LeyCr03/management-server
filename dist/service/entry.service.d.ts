import { Repository } from "typeorm";
import { Account } from "src/entity/account.entity";
import { Entry } from "src/entity/entry.entity";
export declare class EntryService {
    private readonly entryRepository;
    private readonly accountRepository;
    constructor(entryRepository: Repository<Entry>, accountRepository: Repository<Account>);
    createEntry(accountId: string, registered_at: Date): Promise<Entry>;
    findById(id: string): Promise<Entry | null>;
    findAllByDate(date: Date): Promise<Entry[]>;
    deleteEntry(id: string): Promise<{
        message: string;
    }>;
    getAllAccountsEntries(accountId: string): Promise<Entry[]>;
    getAllMonthlyEntries(): Promise<Entry[]>;
}
